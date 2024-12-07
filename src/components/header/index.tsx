import Link from "next/link";
import styles from "./styles.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <nav className={styles.nav}>
          <Link href="/">
            <h1 className={styles.logo}>Tasks+</h1>
          </Link>

          <Link href="/dashboard" className={styles.dashboardLink}>
            Meu Painel
          </Link>
        </nav>

        <button className={styles.loginButton}>Entrar</button>
      </div>
    </header>
  );
}
