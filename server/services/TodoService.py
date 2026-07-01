from models.todo_db import TodoModel
from sqlalchemy.orm import Session

class TodoService:
    def __init__(self):
        pass

    def get_all(self, db: Session):
        todos = db.query(TodoModel).all()
        return todos

    def get(self, todo_id: int, db: Session):
        todo = db.query(TodoModel).filter(TodoModel.id == todo_id).first()
        return todo

    def add(self, name: str, status: str, db: Session):
        if status is None:
            status = "pending"
        todo = TodoModel(name=name, status=status)
        db.add(todo)
        db.commit()
        db.refresh(todo)
        return todo

    def update(self, todo_id: int, name: str | None, status: str | None, db: Session):
        todo = db.query(TodoModel).filter(TodoModel.id == todo_id).first()
        if todo:
            if name is not None:
                todo.name = name
            if status is not None:
                todo.status = status
            db.commit()
            db.refresh(todo)
        return todo

    def delete(self, todo_id: int, db: Session):
        todo = db.query(TodoModel).filter(TodoModel.id == todo_id).first()
        if todo:
            db.delete(todo)
            db.commit()
        return todo
