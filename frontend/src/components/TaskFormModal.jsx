import { useEffect, useState } from "react";

import { validateTaskForm } from "../utils/validators";

const buildInitialForm = (task) => ({
  title: task?.title || "",
  description: task?.description || "",
  priority: task?.priority || "medium",
  status: task?.status || "pending",
  dueDate: task?.dueDate ? task.dueDate.slice(0, 10) : "",
  tags: task?.tags?.join(", ") || "",
});

const TaskFormModal = ({ isOpen, task, isSubmitting, onClose, onSave }) => {
  const [formState, setFormState] = useState(buildInitialForm(task));
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormState(buildInitialForm(task));
    setErrors({});
  }, [task, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((currentState) => ({ ...currentState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateTaskForm(formState);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    await onSave({
      title: formState.title.trim(),
      description: formState.description.trim(),
      priority: formState.priority,
      status: formState.status,
      dueDate: formState.dueDate || null,
      tags: formState.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    });
  };

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-card__header">
          <div>
            <h2>{task ? "Edit task" : "Create a new task"}</h2>
            <p>Capture what needs to happen next and keep the board tidy.</p>
          </div>
          <button className="icon-button" onClick={onClose} type="button">
            Close
          </button>
        </div>

        <form className="task-form" onSubmit={handleSubmit}>
          <label className="input-group">
            <span>Title</span>
            <input
              name="title"
              type="text"
              maxLength="120"
              value={formState.title}
              onChange={handleChange}
              placeholder="Prepare sprint summary"
            />
            {errors.title && <small>{errors.title}</small>}
          </label>

          <label className="input-group">
            <span>Description</span>
            <textarea
              name="description"
              rows="4"
              maxLength="500"
              value={formState.description}
              onChange={handleChange}
              placeholder="Add details, blockers, or context for the task."
            />
            {errors.description && <small>{errors.description}</small>}
          </label>

          <div className="form-row">
            <label className="input-group">
              <span>Priority</span>
              <select name="priority" value={formState.priority} onChange={handleChange}>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </label>

            <label className="input-group">
              <span>Status</span>
              <select name="status" value={formState.status} onChange={handleChange}>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </label>
          </div>

          <div className="form-row">
            <label className="input-group">
              <span>Due date</span>
              <input
                name="dueDate"
                type="date"
                value={formState.dueDate}
                onChange={handleChange}
              />
            </label>

            <label className="input-group">
              <span>Tags</span>
              <input
                name="tags"
                type="text"
                value={formState.tags}
                onChange={handleChange}
                placeholder="frontend, urgent, release"
              />
            </label>
          </div>

          <div className="modal-card__actions">
            <button className="button button--ghost" onClick={onClose} type="button">
              Cancel
            </button>
            <button className="button button--primary" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : task ? "Save changes" : "Create task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskFormModal;
