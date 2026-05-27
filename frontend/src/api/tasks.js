import { apiClient } from "./client";

export const fetchTasks = async (params) => {
  const { data } = await apiClient.get("/tasks", { params });
  return data;
};

export const createTask = async (payload) => {
  const { data } = await apiClient.post("/tasks", payload);
  return data;
};

export const updateTask = async (taskId, payload) => {
  const { data } = await apiClient.patch(`/tasks/${taskId}`, payload);
  return data;
};

export const toggleTaskStatus = async (taskId) => {
  const { data } = await apiClient.patch(`/tasks/${taskId}/status`);
  return data;
};

export const deleteTask = async (taskId) => {
  const { data } = await apiClient.delete(`/tasks/${taskId}`);
  return data;
};

export const fetchAdminOverview = async () => {
  const { data } = await apiClient.get("/users/overview");
  return data;
};
