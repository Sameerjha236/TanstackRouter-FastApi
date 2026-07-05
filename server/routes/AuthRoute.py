from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session
from database import get_db
from controllers.AuthController import signUp, signIn
from schemas.UserType import User
from utils.auth import require_auth


router = APIRouter(prefix="/auth")


@router.post("/signup")
def signup(user: User, db: Session = Depends(get_db)):
    return signUp(user, db)


@router.post("/login")
def login(
    user: User,
    response: Response,
    db: Session = Depends(get_db),
):
    return signIn(user, db, response)


@router.get("/me")
def me(user: dict = Depends(require_auth)):
    return {
        "user_id": user.get("sub"),
        "username": user.get("username"),
    }
