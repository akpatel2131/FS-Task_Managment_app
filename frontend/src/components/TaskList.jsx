import TaskCard from "./TaskCard";
import styles from "./TaskList.module.css";

const TaskList = ({
  tasks,
  isLoading,
  activeTaskId,
  onEdit,
  onDelete,
  onToggle,
}) => {
  if (isLoading) {
    return (
      <section className={`${styles.panelCard} ${styles.centeredState}`}>
        <div className={styles.spinner} />
      </section>
    );
  }

  if (tasks.length === 0) {
    return (
      <section className={`${styles.panelCard} ${styles.emptyState}`}>
        <h3>No tasks match the current filters.</h3>
        <p>Create a task or reset the filters to see more results.</p>
      </section>
    );
  }

  return (
    <section className={styles.taskGrid}>
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggle={onToggle}
          isBusy={activeTaskId === task._id}
        />
      ))}
    </section>
  );
};

export default TaskList;
