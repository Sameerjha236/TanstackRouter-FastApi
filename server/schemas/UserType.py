from pydantic import BaseModel, EmailStr


class UserType(BaseModel):
    username: str
    password: str
    email: EmailStr | None = None
