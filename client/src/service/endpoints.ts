export const ENDPOINTS = {
  TODOS: {
    allTodos: "todos/",
    todoById: (id: string | number) => `todos/${id}`,
    addTodo: "todos/",
    updateTodo: (id: string | number) => `todos/${id}`,
    deleteTodo: (id: string | number) => `todos/${id}`,
  },
};
