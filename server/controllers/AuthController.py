from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from services.AuthService import AuthService
from schemas.UserType import User


def signUp(userData: User, db: Session):
    # Pass the database session ('db') into the service method
    new_user = AuthService.createUser(userData, db)

    if new_user is False:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered",
        )

    return {"message": "User created successfully", "user_id": str(new_user.user_id)}


def signIn(userData: User, db: Session):
    # Validate the credentials using the service layer
    checkCredentials = AuthService.checkUserCredentials(userData, db)

    if checkCredentials is False:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )

    return {"message": "Logged in successfully"}
