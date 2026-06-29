class Todo:
    def __init__(self, id: int, name: str, status: str = "pending"):
        self.id = id
        self.name = name
        self.status = status

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "status": self.status
        }
