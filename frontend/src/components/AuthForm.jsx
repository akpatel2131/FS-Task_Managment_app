import { useEffect, useState } from "react";

import { validateLoginForm, validateSignupForm } from "../utils/validators";

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
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="section-heading">
        <h2>{mode === "signup" ? "Create your workspace" : "Welcome back"}</h2>
        <p>
          {mode === "signup"
            ? "Start organizing priorities with a clean, responsive task board."
            : "Sign in to continue managing your daily plan."}
        </p>
      </div>

      {mode === "signup" && (
        <label className="input-group">
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

      <label className="input-group">
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

      <label className="input-group">
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
        <label className="input-group">
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

      {errorMessage && <div className="form-alert">{errorMessage}</div>}

      <button className="button button--primary button--full" disabled={isSubmitting}>
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
