const StatCard = ({ label, value, accent }) => (
  <article className="stat-card">
    <span className={`stat-card__accent stat-card__accent--${accent}`} />
    <p>{label}</p>
    <strong>{value}</strong>
  </article>
);

const StatsGrid = ({ stats, adminOverview }) => (
  <section className="stats-grid">
    <StatCard label="All Tasks" value={stats.all ?? 0} accent="neutral" />
    <StatCard label="Completed" value={stats.completed ?? 0} accent="success" />
    <StatCard label="Pending" value={stats.pending ?? 0} accent="warning" />
    {adminOverview && (
      <StatCard label="Workspace Users" value={adminOverview.users ?? 0} accent="info" />
    )}
  </section>
);

export default StatsGrid;
