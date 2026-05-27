import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import styles from "./ProtectedRoute.module.css";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className={styles.centeredState}>
        <div className={styles.spinner} />
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
