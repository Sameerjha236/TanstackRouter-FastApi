from sqlalchemy import Column, Integer, String
from database import Base


class TodoModel(Base):
    __tablename__ = "todolist"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    status = Column(String, default="pending")
