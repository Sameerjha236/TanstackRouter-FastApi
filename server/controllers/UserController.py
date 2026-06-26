from services.UserService import UserService


services = UserService()


def getUser():
    return services.getUsers()
