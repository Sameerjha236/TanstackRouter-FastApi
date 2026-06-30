from fastapi import APIRouter
from controllers.TodoController import get_todos, get_todo, add_todo, update_todo, delete_todo
from schemas.TodoType import TodoCreate, TodoUpdate

router = APIRouter(prefix="/todos")

@router.get("/")
def fetch_all_todos():
    return get_todos()

@router.get("/{todo_id}")
def fetch_todo(todo_id: int):
    return get_todo(todo_id)

@router.post("/")
def create_todo(todo: TodoCreate):
    return add_todo(todo)

@router.put("/{todo_id}")
def edit_todo(todo_id: int, todo: TodoUpdate):
    return update_todo(todo_id, todo)

@router.delete("/{todo_id}")
def remove_todo(todo_id: int):
    return delete_todo(todo_id)
