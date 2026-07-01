from services.TodoService import TodoService
from schemas.TodoType import TodoCreate, TodoUpdate
from fastapi import HTTPException, status
from sqlalchemy.orm import Session

services = TodoService()

def get_todos(db: Session):
    return services.get_all(db)

def get_todo(todo_id: int, db: Session):
    todo = services.get(todo_id, db)
    if todo is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Todo with ID {todo_id} not found"
        )
    return todo

def add_todo(todo_data: TodoCreate, db: Session):
    return services.add(todo_data.name, todo_data.status, db)

def update_todo(todo_id: int, todo_data: TodoUpdate, db: Session):
    updated = services.update(todo_id, todo_data.name, todo_data.status, db)
    if updated is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Todo with ID {todo_id} not found"
        )
    return updated

def delete_todo(todo_id: int, db: Session):
    deleted = services.delete(todo_id, db)
    if deleted is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Todo with ID {todo_id} not found"
        )
    return deleted
