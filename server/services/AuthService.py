from schemas.UserType import UserType


users = [
    {
        "username": "sam",
        "password": "1234",
    }
]


def checkUser(user: UserType) -> bool:
    print(user)
    for u in users:
        if u["username"] == user.username and u["password"] == user.password:
            return True
    return False


def addUser(user: UserType) -> bool:
    for u in users:
        if u["username"] == user.username:
            return False

    users.append({"username": user.username, "password": user.password})
    return True
