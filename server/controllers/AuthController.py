from services.AuthService import checkUser, addUser
from schemas.UserType import UserType
from fastapi import HTTPException, status


def login(user: UserType):
    print(user)
    if checkUser(user):
        return {"message": "Success", "username": user.username}
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
    )


def signup(user: UserType):
    if addUser(user):
        return {"message": "User Added"}
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists"
    )
