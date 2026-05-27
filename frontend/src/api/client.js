import axios from "axios";

const storageToken = localStorage.getItem("task_manager_token");

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
});

let authToken = storageToken;

export const setAuthToken = (token) => {
  authToken = token;
};

apiClient.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || "Something went wrong. Please try again.";
    const wrappedError = new Error(message);

    wrappedError.details = error.response?.data?.details || [];
    wrappedError.status = error.response?.status;

    return Promise.reject(wrappedError);
  }
);

