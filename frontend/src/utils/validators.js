const isEmail = (value) => /\S+@\S+\.\S+/.test(value);

export const validateSignupForm = ({ name, email, password }) => {
  const errors = {};

  if (!name.trim() || name.trim().length < 2) {
    errors.name = "Please enter a valid name.";
  }

  if (!email.trim() || !isEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!password || password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  return errors;
};

export const validateLoginForm = ({ email, password }) => {
  const errors = {};

  if (!email.trim() || !isEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required.";
  }

  return errors;
};

export const validateTaskForm = ({ title, description }) => {
  const errors = {};

  if (!title.trim()) {
    errors.title = "Task title is required.";
  }

  if (title.trim().length > 120) {
    errors.title = "Task title must be 120 characters or fewer.";
  }

  if (description.trim().length > 500) {
    errors.description = "Description must be 500 characters or fewer.";
  }

  return errors;
};
