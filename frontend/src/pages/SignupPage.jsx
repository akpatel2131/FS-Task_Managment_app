import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthForm from "../components/AuthForm";
import useAuth from "../hooks/useAuth";
import AuthLayout from "../layouts/AuthLayout";

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (payload) => {
    try {
      setIsSubmitting(true);
      setErrorMessage("");
      await signup(payload);
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <AuthLayout
        title="Build a sharper workflow."
        subtitle="Create your account and start organizing tasks with a fast, mobile-ready interface."
        switchText="Already registered?"
        switchLink="/login"
      >
        <AuthForm
          mode="signup"
          onSubmit={handleSignup}
          isSubmitting={isSubmitting}
          errorMessage={errorMessage}
        />
      </AuthLayout>
  );
};

export default SignupPage;
