import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthForm from "../components/AuthForm";
import useAuth from "../hooks/useAuth";
import AuthLayout from "../layouts/AuthLayout";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (payload) => {
    try {
      setIsSubmitting(true);
      setErrorMessage("");
      await login(payload);
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <AuthLayout
        title="Track work with confidence."
        subtitle="A modern task board for capturing priorities, progress, and momentum."
        switchText="Need an account?"
        switchLink="/signup"
      >
        <AuthForm
          mode="login"
          onSubmit={handleLogin}
          isSubmitting={isSubmitting}
          errorMessage={errorMessage}
        />
      </AuthLayout>
  );
};

export default LoginPage;
