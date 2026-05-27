import styles from "./TaskCard.module.css";

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
  <article className={styles.taskCard}>
    <div className={styles.taskCardHeader}>
      <div>
        <div className={styles.taskCardLabels}>
          <span
            className={`${styles.pill} ${
              task.status === "completed" ? styles.pillCompleted : styles.pillPending
            }`}
          >
            {task.status}
          </span>
          <span
            className={`${styles.pill} ${
              task.priority === "high"
                ? styles.pillPriorityHigh
                : task.priority === "medium"
                  ? styles.pillPriorityMedium
                  : styles.pillPriorityLow
            }`}
          >
            {task.priority}
          </span>
        </div>
        <h3>{task.title}</h3>
      </div>
      <button
        className={styles.iconButton}
        onClick={() => onEdit(task)}
        type="button"
        aria-label={`Edit ${task.title}`}
      >
        Edit
      </button>
    </div>

    <p className={styles.taskCardDescription}>
      {task.description || "No description added yet."}
    </p>

    <div className={styles.taskCardMeta}>
      <span>Due: {formatDate(task.dueDate)}</span>
      <span>Updated: {formatDate(task.updatedAt)}</span>
    </div>

    {task.user?.name && (
      <div className={styles.taskCardOwner}>Owner: {task.user.name}</div>
    )}

    {task.tags?.length > 0 && (
      <div className={styles.tagList}>
        {task.tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            #{tag}
          </span>
        ))}
      </div>
    )}

    <div className={styles.taskCardActions}>
      <button
        className={`${styles.button} ${styles.buttonSecondary}`}
        onClick={() => onToggle(task._id)}
        type="button"
        disabled={isBusy}
      >
        {task.status === "completed" ? "Mark pending" : "Mark complete"}
      </button>
      <button
        className={`${styles.button} ${styles.buttonDanger}`}
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
