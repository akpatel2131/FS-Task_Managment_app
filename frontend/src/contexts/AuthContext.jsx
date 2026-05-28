import { createContext, useEffect, useState } from "react";

import { fetchCurrentUser, loginUser, signupUser } from "../api/auth";
import { setAuthToken } from "../api/client";

export const AuthContext = createContext(null);

const TOKEN_KEY = "task_manager_token";
const USER_KEY = "task_manager_user";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem(USER_KEY);
    if (!storedUser || storedUser === "undefined") {
      return null;
    }

    try {
      return JSON.parse(storedUser);
    } catch (error) {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setAuthToken(token);

    if (!token) {
      setIsLoading(false);
      return;
    }

    const syncUser = async () => {
      try {
        const response = await fetchCurrentUser();
        setUser(response.user);
        localStorage.setItem(USER_KEY, JSON.stringify(response.user));
      } catch (error) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setToken(null);
        setUser(null);
        setAuthToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    syncUser();
  }, [token]);

  const persistAuth = (payload) => {
    localStorage.setItem(TOKEN_KEY, payload.token);
    localStorage.setItem(USER_KEY, JSON.stringify(payload.user));
    setAuthToken(payload.token);
    setToken(payload.token);
    setUser(payload.user);
  };

  const signup = async (payload) => {
    const response = await signupUser(payload);
    persistAuth(response);
    return response;
  };

  const login = async (payload) => {
    const response = await loginUser(payload);
    persistAuth(response);
    return response;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setAuthToken(null);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: Boolean(token),
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
