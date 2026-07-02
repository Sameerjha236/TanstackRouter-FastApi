from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from controllers.AuthController import signUp, signIn
from schemas.UserType import User


router = APIRouter(prefix="/auth")


@router.post("/signup")
def signup(user: User, db: Session = Depends(get_db)):
    return signUp(user, db)


@router.post("/login")
def login(user: User, db: Session = Depends(get_db)):
    return signIn(user, db)
