import { Link } from "react-router-dom";
import styles from "./AuthLayout.module.css";

const AuthLayout = ({ title, subtitle, switchText, switchLink, children }) => (
  <main className={styles.authPage}>
    <section className={styles.authHero}>
      <div className={styles.authHeroBadge}>Focused work, fewer loose ends</div>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <div className={styles.authHeroPanel}>
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

    <section className={styles.authCard}>
      {children}
      <p className={styles.authSwitch}>
        {switchText} <Link to={switchLink}>Switch here</Link>
      </p>
    </section>
  </main>
);

export default AuthLayout;
