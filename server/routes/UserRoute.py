from fastapi import APIRouter
from controllers.UserController import getUser


router = APIRouter(prefix="/users")


@router.get("/")
def fetchUsers():
    return getUser()
