from pydantic import BaseModel

class TodoCreate(BaseModel):
    name: str
    status: str = "pending"

class TodoUpdate(BaseModel):
    name: str | None = None
    status: str | None = None
