use dioxus::prelude::*;
use tracing::info;
use std::collections::HashMap;

#[derive(PartialEq)]
enum FilterState {
    All,
    Active,
    Completed,
}

#[derive(Debug, Clone, PartialEq)]
struct TodoItem {
    id: u32,
    status: bool,
    content: String,
}
 
pub fn app(cx: Scope) -> Element {
    // let todos = cx.use_hook(|_| HashMap::<u32, TodoItem>::new());
    let (todos, set_todos) = use_state(&cx, || HashMap::<u32, TodoItem>::new());
    let (draft, set_draft) = use_state(&cx, || "".to_string());
    let (todo_id, set_todo_id) = use_state(&cx, || 0);
    let (filter, set_filter) = use_state(&cx, || FilterState::All);

    let filtered_todos = todos
        .iter()
        .filter(|(_, todo)| match filter {
            FilterState::All => true,
            FilterState::Active => !todo.status,
            FilterState::Completed => todo.status,
        })
        .map(|f| *f.0)
        .collect::<Vec<_>>();
    info!("filtered_todos: {:?}", filtered_todos);

    let items_left = filtered_todos.len();
    let item_text = match items_left {
        1 => "item",
        _ => "items",
    };
    let all_selected = if *filter == FilterState::All { "selected" } else { "" };
    let active_selected = if *filter == FilterState::Active { "selected" } else { "" };
    let completed_selected = if *filter == FilterState::Completed { "selected" } else { "" };

    cx.render(rsx!{
        div {
            style { [include_str!("./style.css")] },
            section {
                class: "todoapp",
                div { 
                    header {
                        class: "header",
                        h1 { "todos" }
                        input {
                            class: "new-todo",
                            placeholder: "What needs to be done?",
                            value: "{draft}",
                            oninput: move |e| {
                                // info!("input: {:?}", e.value);
                                set_draft(e.value.clone());
                            },
                            onkeydown: move |e| {
                                if e.key == "Enter" && !draft.is_empty() {
                                    // info!("keydown: {:?}", e);
                                    set_todos.make_mut().insert(*todo_id, TodoItem {
                                        id: *todo_id,
                                        status: false,
                                        content: draft.to_string(),
                                    });
                                    set_draft("".to_string());
                                    set_todo_id(todo_id + 1);
                                }
                            }
                        }
                    },
                    section {
                        class: "main",
                        ul {
                            class: "todo-list",
                            filtered_todos.iter().map(|id| rsx!(todo_entry( key: "{id}", id: *id, set_todos: set_todos  )))
                        }
                    },
                    (!todos.is_empty()).then(|| rsx! {
                        footer {
                            class: "footer",
                            span {
                                class: "todo-count",
                                strong {
                                    "{items_left}"
                                },
                                span {
                                    " {item_text} left"
                                }
                            },
                            ul {
                                class: "filters",
                                li {
                                    class: "All",
                                    a {
                                        class: "{all_selected}",
                                        onclick: move |_| {
                                            set_filter(FilterState::All);
                                        },
                                        "All"
                                    }
                                },
                                li {
                                    class: "Active",
                                    a {
                                        class: "{active_selected}",
                                        onclick: move |_| {
                                            set_filter(FilterState::Active);
                                        },
                                        "Active"
                                    }
                                },
                                li {
                                    class: "Completed",
                                    a {
                                        class: "{completed_selected}",
                                        onclick: move |_| {
                                            set_filter(FilterState::Completed);
                                        },
                                        "Completed"
                                    }
                                }
                            }
                        }
                    })
                 }
            }
        }
    })
}

#[derive(Props)]
struct TodoEntryProps<'a> {
    set_todos: &'a UseState<HashMap<u32, TodoItem>>,
    id: u32,
}

fn todo_entry<'a>(cx: Scope<'a, TodoEntryProps<'a>>) -> Element {
    let todos = cx.props.set_todos.get();
    let todo = todos.get(&cx.props.id).unwrap();
    let completed = if todo.status { "completed" } else { "" };
    rsx!(cx, li {
        class: "{completed}",
        div {
            class: "view",
            input {
                class: "toggle",
                r#type: "checkbox",
                id: "todo_{todo.id}",
                checked: "{todo.status}",
                onchange: move |e| {
                    info!("change: {:?}", e);
                    cx.props.set_todos.make_mut().get_mut(&cx.props.id).unwrap().status = e.value.parse().unwrap();
                },
            },
            label {
                r#for: "todo_{todo.id}",
                "{todo.content}",
            }
        }
    })
}