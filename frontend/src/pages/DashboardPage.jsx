import { useNavigate } from "react-router-dom";

import ThemeToggle from "../components/ThemeToggle";
import useAuth from "../hooks/useAuth";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <main className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <div className="brand-block">
          <span className="brand-block__eyebrow">Task Management App</span>
          <h1>Your account is ready.</h1>
          <p>
            This protected dashboard confirms auth routing, persisted sessions, and
            current-user restoration are working in this frontend.
          </p>
        </div>

        <div className="side-card">
          <span className="side-card__label">Signed in as</span>
          <strong>{user?.name}</strong>
          <p>{user?.email}</p>
          <span className="role-badge">{user?.role || "user"}</span>
        </div>
      </aside>

      <section className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <span className="dashboard-header__eyebrow">Dashboard</span>
            <h2>Protected route active</h2>
          </div>
          <div className="header-actions">
            <ThemeToggle />
            <button className="button button--ghost" onClick={handleLogout} type="button">
              Logout
            </button>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="stats-grid">
            <article className="stat-card">
              <div className="stat-card__accent stat-card__accent--neutral" />
              <p>Auth state</p>
              <strong>Persisted</strong>
            </article>
            <article className="stat-card">
              <div className="stat-card__accent stat-card__accent--success" />
              <p>Reload recovery</p>
              <strong>Enabled</strong>
            </article>
            <article className="stat-card">
              <div className="stat-card__accent stat-card__accent--info" />
              <p>Public route guard</p>
              <strong>Enabled</strong>
            </article>
          </div>

          <section className="panel-card">
            <div className="section-heading">
              <h2>Feature summary</h2>
              <p>
                Login and signup store auth in <code>localStorage</code>, protected
                routes block guests, and the app refetches <code>/auth/me</code> on
                reload to restore the signed-in user safely.
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
