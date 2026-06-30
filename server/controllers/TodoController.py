from services.TodoService import TodoService
from schemas.TodoType import TodoCreate, TodoUpdate
from fastapi import HTTPException, status

services = TodoService()

def get_todos():
    return services.get_all()

def get_todo(todo_id: int):
    todo = services.get(todo_id)
    if todo is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Todo with ID {todo_id} not found"
        )
    return todo

def add_todo(todo_data: TodoCreate):
    return services.add(todo_data.name, todo_data.status)

def update_todo(todo_id: int, todo_data: TodoUpdate):
    updated = services.update(todo_id, todo_data.name, todo_data.status)
    if updated is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Todo with ID {todo_id} not found"
        )
    return updated

def delete_todo(todo_id: int):
    deleted = services.delete(todo_id)
    if deleted is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Todo with ID {todo_id} not found"
        )
    return deleted
