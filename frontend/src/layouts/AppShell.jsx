const AppShell = ({ sidebar, header, children }) => (
  <main className="dashboard-shell">
    <aside className="dashboard-sidebar">{sidebar}</aside>
    <section className="dashboard-main">
      <header className="dashboard-header">{header}</header>
      <div className="dashboard-content">{children}</div>
    </section>
  </main>
);

export default AppShell;
