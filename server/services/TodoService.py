from models.Todo import Todo

class TodoService:
    def __init__(self):
        self.todos = []
        self._next_id = 1

    def get_all(self):
        return [todo.to_dict() for todo in self.todos]

    def get(self, todo_id: int):
        for todo in self.todos:
            if todo.id == todo_id:
                return todo.to_dict()
        return None

    def add(self, name: str, status: str = "pending"):
        todo = Todo(self._next_id, name, status)
        self.todos.append(todo)
        self._next_id += 1
        return todo.to_dict()

    def update(self, todo_id: int, name: str | None = None, status: str | None = None):
        for todo in self.todos:
            if todo.id == todo_id:
                if name is not None:
                    todo.name = name
                if status is not None:
                    todo.status = status
                return todo.to_dict()
        return None

    def delete(self, todo_id: int):
        for index, todo in enumerate(self.todos):
            if todo.id == todo_id:
                deleted_todo = self.todos.pop(index)
                return deleted_todo.to_dict()
        return None
