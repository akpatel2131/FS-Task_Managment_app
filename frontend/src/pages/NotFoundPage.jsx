import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <main className="centered-state">
    <section className="panel-card panel-card--narrow empty-state">
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link className="button button--primary" to="/dashboard">
        Go to dashboard
      </Link>
    </section>
  </main>
);

export default NotFoundPage;

