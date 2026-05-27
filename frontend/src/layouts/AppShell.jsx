import styles from "./AppShell.module.css";

const AppShell = ({ header, children }) => (
  <main className={styles.dashboardShell}>
    <section className={styles.dashboardMain}>
      <header className={styles.dashboardHeader}>{header}</header>
      <div className={styles.dashboardContent}>{children}</div>
    </section>
  </main>
);

export default AppShell;
