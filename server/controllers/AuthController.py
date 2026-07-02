from fastapi import HTTPException, status, Response
from sqlalchemy.orm import Session
from services.AuthService import AuthService
from schemas.UserType import User
from utils.jwtHelper import JwtHelper


def signUp(userData: User, db: Session):

    new_user = AuthService.createUser(userData, db)

    if new_user is False:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered",
        )

    return {"message": "User created successfully", "user_id": str(new_user.user_id)}


def signIn(userData: User, db: Session, response: Response):
    user = AuthService.checkUserCredentials(userData, db)

    if user is False:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )

    # Generate token
    token = JwtHelper.create_access_token(
        data={"sub": str(user.user_id), "username": user.username}
    )

    # Set the token in an HTTP-only cookie
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,  # Prevents JavaScript reading the cookie (protects XSS)
        secure=False,  # Ensures cookie is only sent over HTTPS
        samesite="lax",  # Protects against CSRF attacks
        max_age=1800,  # Match token expiration (30 mins in seconds)
    )

    return {"message": "Logged in successfully"}
