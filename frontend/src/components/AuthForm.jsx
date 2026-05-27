import { useEffect, useState } from "react";

import { validateLoginForm, validateSignupForm } from "../utils/validators";
import styles from "./AuthForm.module.css";

const initialState = {
  name: "",
  email: "",
  password: "",
  inviteCode: "",
};

const AuthForm = ({ mode, onSubmit, isSubmitting, errorMessage }) => {
  const [formState, setFormState] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormState(initialState);
    setErrors({});
  }, [mode]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((currentState) => ({ ...currentState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors =
      mode === "signup"
        ? validateSignupForm(formState)
        : validateLoginForm(formState);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const payload =
      mode === "signup"
        ? formState
        : { email: formState.email, password: formState.password };

    await onSubmit(payload);
  };

  return (
    <form className={styles.authForm} onSubmit={handleSubmit}>
      <div className={styles.sectionHeading}>
        <h2>{mode === "signup" ? "Create your workspace" : "Welcome back"}</h2>
        <p>
          {mode === "signup"
            ? "Start organizing priorities with a clean, responsive task board."
            : "Sign in to continue managing your daily plan."}
        </p>
      </div>

      {mode === "signup" && (
        <label className={styles.inputGroup}>
          <span>Full name</span>
          <input
            name="name"
            type="text"
            placeholder="Alex Johnson"
            value={formState.name}
            onChange={handleChange}
          />
          {errors.name && <small>{errors.name}</small>}
        </label>
      )}

      <label className={styles.inputGroup}>
        <span>Email address</span>
        <input
          name="email"
          type="email"
          placeholder="you@example.com"
          value={formState.email}
          onChange={handleChange}
        />
        {errors.email && <small>{errors.email}</small>}
      </label>

      <label className={styles.inputGroup}>
        <span>Password</span>
        <input
          name="password"
          type="password"
          placeholder="Minimum 6 characters"
          value={formState.password}
          onChange={handleChange}
        />
        {errors.password && <small>{errors.password}</small>}
      </label>

      {mode === "signup" && (
        <label className={styles.inputGroup}>
          <span>Admin invite code (optional)</span>
          <input
            name="inviteCode"
            type="text"
            placeholder="Only needed for admin access"
            value={formState.inviteCode}
            onChange={handleChange}
          />
        </label>
      )}

      {errorMessage && <div className={styles.formAlert}>{errorMessage}</div>}

      <button
        className={`${styles.button} ${styles.buttonPrimary} ${styles.buttonFull}`}
        disabled={isSubmitting}
      >
        {isSubmitting
          ? "Please wait..."
          : mode === "signup"
            ? "Create account"
            : "Login"}
      </button>
    </form>
  );
};

export default AuthForm;
