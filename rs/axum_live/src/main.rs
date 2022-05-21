use axum::{
    TypedHeader,
    headers::{ Authorization, authorization::Bearer }, 
    Json,
    routing::{ get, post },
    Router,
};
use serde::{ Serialize, Deserialize };
use std::net::SocketAddr;
use jsonwebtoken::{ encode, decode, Header, Validation, EncodingKey, DecodingKey };

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
    exp: usize,
}

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/", get(root))
        .route("/login", post(login_handler))
        .route("/todo", post(todo_handler));

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
        exp: 1654358400,
    };

    let token = encode(&Header::default(), &claims, &EncodingKey::from_secret("secret".as_ref())).unwrap();
    Json(LoginResponse {
        token: token,
    })
}

async fn todo_handler(TypedHeader(Authorization(bearer)): TypedHeader<Authorization<Bearer>>) -> Json<String> {
    println!("payload: {:?}", bearer);
    let token = bearer.token();
    println!("token: {:?}", token);
    let user = decode::<Claims>(&token, &DecodingKey::from_secret("secret".as_ref()), &Validation::default()).unwrap();
    println!("user: {:?}", user);
    Json("Hello, World!".to_string())
}