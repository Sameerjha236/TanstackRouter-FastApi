from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from controllers.TodoController import get_todos, get_todo, add_todo, update_todo, delete_todo
from schemas.TodoType import TodoCreate, TodoUpdate

router = APIRouter(prefix="/todos")

@router.get("/")
def fetch_all_todos(db: Session = Depends(get_db)):
    return get_todos(db)

@router.get("/{todo_id}")
def fetch_todo(todo_id: int, db: Session = Depends(get_db)):
    return get_todo(todo_id, db)

@router.post("/")
def create_todo(todo: TodoCreate, db: Session = Depends(get_db)):
    return add_todo(todo, db)

@router.put("/{todo_id}")
def edit_todo(todo_id: int, todo: TodoUpdate, db: Session = Depends(get_db)):
    return update_todo(todo_id, todo, db)

@router.delete("/{todo_id}")
def remove_todo(todo_id: int, db: Session = Depends(get_db)):
    return delete_todo(todo_id, db)
