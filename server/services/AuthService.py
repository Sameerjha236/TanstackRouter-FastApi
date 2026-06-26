from schemas.UserType import UserType


def checkUser(user: UserType) -> bool:
    if user.username == "sam" and user.password == "1234":
        return True
    return False
