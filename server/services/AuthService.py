from sqlalchemy.orm import Session
from models.user_db import UserModel
from schemas.UserType import User


class AuthService:
    @staticmethod
    def createUser(userData: User, db: Session):
        # Check if user already exists
        existing_user = (
            db.query(UserModel).filter(UserModel.username == userData.username).first()
        )
        if existing_user:
            return False

        # Create new user instance
        new_user = UserModel(username=userData.username, password=userData.password)

        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user

    @staticmethod
    def checkUserCredentials(userData: User, db: Session):
        # Find the user by username
        existing_user = (
            db.query(UserModel).filter(UserModel.username == userData.username).first()
        )

        # If user does not exist, credentials are invalid
        if not existing_user:
            return False

        # Check if the password matches
        if existing_user.password != userData.password:
            return False

        return True
