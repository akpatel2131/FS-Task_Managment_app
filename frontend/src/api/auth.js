import { apiClient } from "./client";

export const signupUser = async (payload) => {
  const { data } = await apiClient.post("/auth/signup", payload);
  return data;
};

export const loginUser = async (payload) => {
  const { data } = await apiClient.post("/auth/login", payload);
  return data;
};

export const fetchCurrentUser = async () => {
  const { data } = await apiClient.get("/auth/me");
  return data;
};
