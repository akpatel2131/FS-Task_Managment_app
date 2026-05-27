const formatDate = (dateString) => {
  if (!dateString) {
    return "No due date";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
};

const TaskCard = ({ task, onEdit, onDelete, onToggle, isBusy }) => (
  <article className="task-card">
    <div className="task-card__header">
      <div>
        <div className="task-card__labels">
          <span className={`pill pill--${task.status}`}>{task.status}</span>
          <span className={`pill pill--priority-${task.priority}`}>{task.priority}</span>
        </div>
        <h3>{task.title}</h3>
      </div>
      <button
        className="icon-button"
        onClick={() => onEdit(task)}
        type="button"
        aria-label={`Edit ${task.title}`}
      >
        Edit
      </button>
    </div>

    <p className="task-card__description">
      {task.description || "No description added yet."}
    </p>

    <div className="task-card__meta">
      <span>Due: {formatDate(task.dueDate)}</span>
      <span>Updated: {formatDate(task.updatedAt)}</span>
    </div>

    {task.user?.name && (
      <div className="task-card__owner">Owner: {task.user.name}</div>
    )}

    {task.tags?.length > 0 && (
      <div className="tag-list">
        {task.tags.map((tag) => (
          <span key={tag} className="tag">
            #{tag}
          </span>
        ))}
      </div>
    )}

    <div className="task-card__actions">
      <button
        className="button button--secondary"
        onClick={() => onToggle(task._id)}
        type="button"
        disabled={isBusy}
      >
        {task.status === "completed" ? "Mark pending" : "Mark complete"}
      </button>
      <button
        className="button button--danger"
        onClick={() => onDelete(task._id)}
        type="button"
        disabled={isBusy}
      >
        Delete
      </button>
    </div>
  </article>
);

export default TaskCard;
