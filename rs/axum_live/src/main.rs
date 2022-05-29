use axum::{
    TypedHeader,
    headers::{ Authorization, authorization::Bearer }, 
    Json,
    routing::{ get, post },
    Router,
    async_trait,
    extract::{ FromRequest, RequestParts, Extension },
    http::StatusCode,
    response::{ IntoResponse, Response },
};
use serde::{ Serialize, Deserialize };
use std::net::SocketAddr;
use jsonwebtoken::{ encode, decode, Header, Validation, EncodingKey, DecodingKey };
use std::time::SystemTime;
use std::sync::{ Arc, RwLock };

#[derive(Debug, Serialize, Deserialize)]
struct Login {
    email: String,
    password: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct LoginResponse {
    token: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    id: usize,
    name: String,
    exp: u64,
}

#[async_trait]
impl<B> FromRequest<B> for Claims
where
    B: Send,
{
    type Rejection = HttpError;

    async fn from_request(req: &mut RequestParts<B>) -> Result<Self, Self::Rejection> {
        let TypedHeader(Authorization(bearer)) = TypedHeader::<Authorization<Bearer>>::from_request(req).await.map_err(|_| HttpError::Auth)?;
        let token = decode::<Claims>(&bearer.token(), &DecodingKey::from_secret("secret".as_ref()), &Validation::default()).map_err(|_| HttpError::Auth)?;
        println!("token: {:?}", token);
        Ok(token.claims)
    }
}

enum HttpError {
    Auth,
    Internal,
}

impl IntoResponse for HttpError {
    fn into_response(self) -> Response {
        let (code, msg) = match self {
            HttpError::Auth => (StatusCode::INTERNAL_SERVER_ERROR, "Unauthorized"),
            HttpError::Internal => (StatusCode::INTERNAL_SERVER_ERROR, "Internal Server Error"),
        };

        (code, msg).into_response()
    }
}

#[derive(Debug, Serialize, Deserialize)]
struct CreateTodo {
    title: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct Todo {
    id: usize,
    title: String,
    done: bool,
    user_id: usize,
}

#[derive(Debug, Default, Clone)]
struct TodoStore {
    todos: Arc<RwLock<Vec<Todo>>>,
}

#[tokio::main]
async fn main() {
    let todos = TodoStore::default();
    let app = Router::new()
        .route("/", get(root))
        .route("/login", post(login_handler))
        .route("/todo", get(todo_handler).post(create_todo_handler).layer(Extension(todos)));

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

async fn root() -> &'static str {
    "Hello, World!"
}

async fn login_handler(Json(payload): Json<Login>) -> Json<LoginResponse> {
    println!("payload: {:?}", payload);
    let claims = Claims {
        id: 1,
        name: "Axum".to_string(),
        exp: get_epoch() + 7 * 24 * 60 * 60,
    };

    let token = encode(&Header::default(), &claims, &EncodingKey::from_secret("secret".as_ref())).unwrap();
    Json(LoginResponse {
        token: token,
    })
}

async fn todo_handler(claims: Claims, Extension(store): Extension<TodoStore>) -> Result<Json<Vec<Todo>>, HttpError> {
    println!("claims: {:?}", claims);
    let user_id = claims.id;
    match store.todos.read() {
        Ok(todos) => Ok(Json(todos.iter().filter(|todo| todo.user_id == user_id).map(|todo| todo.clone()).collect())),
        Err(_) => Err(HttpError::Internal),
    }
}

async fn create_todo_handler(Json(_todo): Json<CreateTodo>, claims: Claims, Extension(store): Extension<TodoStore>) -> Result<StatusCode, HttpError> {
    println!("_todo: {:?}", _todo);
    println!("claims: {:?}", claims);
    match store.todos.write() {
        Ok(mut todos) => {
            let todo = Todo {
                id: 0,
                title: _todo.title,
                done: false,
                user_id: claims.id,
            };
            todos.push(todo);
            Ok(StatusCode::CREATED)
        },
        Err(_) => Err(HttpError::Internal),
    }
}

fn get_epoch() -> u64 {
    match SystemTime::now().duration_since(SystemTime::UNIX_EPOCH) {
        Ok(n) => n.as_secs(),
        Err(_) => 0,
    }
}