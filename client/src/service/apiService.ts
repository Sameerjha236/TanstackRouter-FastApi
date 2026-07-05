import axiosClient from "./axiosClient";
import { ENDPOINTS } from "./endpoints";

const apiService = {
  getAllTodos: (): Promise<any> => {
    return axiosClient.get(ENDPOINTS.TODOS.allTodos);
  },
  getTodoById: (id: string | number): Promise<any> => {
    return axiosClient.get(ENDPOINTS.TODOS.todoById(id));
  },
  addTodo: (data: { name: string; status?: string }): Promise<any> => {
    return axiosClient.post(ENDPOINTS.TODOS.addTodo, data);
  },
  updateTodo: (
    id: string | number,
    data: { name?: string; status?: string },
  ): Promise<any> => {
    return axiosClient.put(ENDPOINTS.TODOS.updateTodo(id), data);
  },
  deleteTodo: (id: string | number): Promise<any> => {
    return axiosClient.delete(ENDPOINTS.TODOS.deleteTodo(id));
  },
  login: (data: { username: string; password: string }): Promise<any> => {
    return axiosClient.post(ENDPOINTS.AUTH.login, data);
  },
  signup: (data: { username: string; password: string }): Promise<any> => {
    return axiosClient.post(ENDPOINTS.AUTH.signup, data);
  },
  getMe: (): Promise<{ user_id: string; username: string }> => {
    return axiosClient.get(ENDPOINTS.AUTH.me);
  },
};

export default apiService;
