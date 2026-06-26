from services.AuthService import checkUser
from schemas.UserType import UserType
from fastapi import HTTPException


def login(user: UserType):
    is_valid = checkUser(user)
    if is_valid:
        return {"message": "Success", "user": user.username}
    raise HTTPException(status_code=401, detail="Invalid credentials")
