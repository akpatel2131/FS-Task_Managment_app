import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => (
  <main className={styles.centeredState}>
    <section className={`${styles.panelCard} ${styles.panelCardNarrow} ${styles.emptyState}`}>
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link className={`${styles.button} ${styles.buttonPrimary}`} to="/dashboard">
        Go to dashboard
      </Link>
    </section>
  </main>
);

export default NotFoundPage;
