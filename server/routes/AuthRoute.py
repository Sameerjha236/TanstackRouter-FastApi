from fastapi import APIRouter
from controllers.AuthController import login
from schemas.UserType import UserType

router = APIRouter(prefix="/auth")


@router.post("/login")
def login_route(user: UserType):
    return login(user)
