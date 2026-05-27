import { Link } from "react-router-dom";

const AuthLayout = ({ title, subtitle, switchText, switchLink, children }) => (
  <main className="auth-page">
    <section className="auth-hero">
      <div className="auth-hero__badge">Focused work, fewer loose ends</div>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <div className="auth-hero__panel">
        <div>
          <strong>Daily rhythm</strong>
          <span>Capture work quickly and move from backlog to done.</span>
        </div>
        <div>
          <strong>Clean visibility</strong>
          <span>Search, filter, and prioritize without clutter.</span>
        </div>
        <div>
          <strong>Every screen supported</strong>
          <span>Optimized for laptops, tablets, and mobile devices.</span>
        </div>
      </div>
    </section>

    <section className="auth-card">
      {children}
      <p className="auth-switch">
        {switchText} <Link to={switchLink}>Switch here</Link>
      </p>
    </section>
  </main>
);

export default AuthLayout;
