from sqlalchemy.orm import Session
from models.user_db import UserModel
from schemas.UserType import User
from utils.Crypto import CryptoHelper


class AuthService:
    @staticmethod
    def createUser(userData: User, db: Session):
        # Adjusted to use userData.username
        existing_user = (
            db.query(UserModel).filter(UserModel.username == userData.username).first()
        )
        if existing_user:
            return False

        hashed_password = CryptoHelper.hash_password(userData.password)

        new_user = UserModel(username=userData.username, password=hashed_password)

        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user

    @staticmethod
    def checkUserCredentials(userData: User, db: Session):
        existing_user = (
            db.query(UserModel).filter(UserModel.username == userData.username).first()
        )

        if not existing_user:
            return False

        if not CryptoHelper.verify_password(userData.password, existing_user.password):
            return False

        return existing_user  # Return the user object instead of True
