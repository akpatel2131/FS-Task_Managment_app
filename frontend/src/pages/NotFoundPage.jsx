import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <main className="centered-state">
    <section className="panel-card panel-card--narrow">
      <div className="section-heading">
        <h2>Page not found</h2>
        <p>The page you requested does not exist in this frontend.</p>
      </div>
      <Link className="button button--primary button--full" to="/dashboard">
        Back to dashboard
      </Link>
    </section>
  </main>
);

export default NotFoundPage;
