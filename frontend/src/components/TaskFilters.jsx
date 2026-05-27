import styles from "./TaskFilters.module.css";

const TaskFilters = ({
  filters,
  onFilterChange,
  onResetFilters,
  onCreateTask,
  isAdmin,
}) => (
  <section className={styles.toolbarCard}>
    <div className={styles.toolbarCardTop}>
      <div>
        <h2>Task Board</h2>
        <p>Search, sort, and focus on what needs attention right now.</p>
      </div>
      <button
        className={`${styles.button} ${styles.buttonPrimary}`}
        onClick={onCreateTask}
        type="button"
      >
        + New Task
      </button>
    </div>

    <div className={styles.filterGrid}>
      <label className={`${styles.inputGroup} ${styles.inputGroupCompact}`}>
        <span>Search</span>
        <input
          name="search"
          type="text"
          placeholder="Search title, description, or tags"
          value={filters.search}
          onChange={onFilterChange}
        />
      </label>

      <label className={`${styles.inputGroup} ${styles.inputGroupCompact}`}>
        <span>Status</span>
        <select name="status" value={filters.status} onChange={onFilterChange}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </label>

      <label className={`${styles.inputGroup} ${styles.inputGroupCompact}`}>
        <span>Priority</span>
        <select name="priority" value={filters.priority} onChange={onFilterChange}>
          <option value="all">All</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </label>

      <label className={`${styles.inputGroup} ${styles.inputGroupCompact}`}>
        <span>Sort by</span>
        <select name="sortBy" value={filters.sortBy} onChange={onFilterChange}>
          <option value="createdAt">Recently created</option>
          <option value="updatedAt">Recently updated</option>
          <option value="dueDate">Due date</option>
          <option value="title">Title</option>
        </select>
      </label>

      <label className={`${styles.inputGroup} ${styles.inputGroupCompact}`}>
        <span>Order</span>
        <select name="order" value={filters.order} onChange={onFilterChange}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </label>

      {isAdmin && (
        <label className={`${styles.inputGroup} ${styles.inputGroupCompact}`}>
          <span>Scope</span>
          <select name="scope" value={filters.scope} onChange={onFilterChange}>
            <option value="mine">My tasks</option>
            <option value="all">All workspace tasks</option>
          </select>
        </label>
      )}
    </div>

    <button className={`${styles.button} ${styles.buttonGhost}`} onClick={onResetFilters} type="button">
      Reset filters
    </button>
  </section>
);

export default TaskFilters;
