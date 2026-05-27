import styles from "./StatsGrid.module.css";

const StatCard = ({ label, value, accent }) => (
  <article className={styles.statCard}>
    <span
      className={`${styles.statCardAccent} ${
        accent === "neutral"
          ? styles.accentNeutral
          : accent === "success"
            ? styles.accentSuccess
            : accent === "warning"
              ? styles.accentWarning
              : styles.accentInfo
      }`}
    />
    <p>{label}</p>
    <strong>{value}</strong>
  </article>
);

const StatsGrid = ({ stats, adminOverview }) => (
  <section className={styles.statsGrid}>
    <StatCard label="All Tasks" value={stats.all ?? 0} accent="neutral" />
    <StatCard label="Completed" value={stats.completed ?? 0} accent="success" />
    <StatCard label="Pending" value={stats.pending ?? 0} accent="warning" />
    {adminOverview && (
      <StatCard label="Workspace Users" value={adminOverview.users ?? 0} accent="info" />
    )}
  </section>
);

export default StatsGrid;
