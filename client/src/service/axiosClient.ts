import axios, { type AxiosInstance, type AxiosResponse } from "axios";

const axiosClient: AxiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:8000/",
  baseURL: "http://localhost:8000/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    return Promise.reject(error.response?.data || "Server Error");
  },
);

export default axiosClient;
