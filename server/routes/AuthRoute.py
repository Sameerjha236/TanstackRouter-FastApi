from fastapi import APIRouter
from controllers.AuthController import login, signup
from schemas.UserType import UserType

router = APIRouter(prefix="/auth")


@router.post("/signup")
def signup_route(user: UserType):
    return signup(user)


@router.post("/login")
def login_route(user: UserType):
    return login(user)
