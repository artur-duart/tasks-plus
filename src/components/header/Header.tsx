"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import styles from "./header.module.css";
import { FiLogOut } from "react-icons/fi";

export function Header() {
  const { data: session, status } = useSession();
  const userName = session?.user?.name;
  const firstName = userName?.split(" ")[0];

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <nav className={styles.nav}>
          <Link href="/">
            <h1 className={styles.logo}>Tasks+</h1>
          </Link>

          {session?.user && (
            <Link href="/dashboard" className={styles.dashboardLink}>
              Meu Painel
            </Link>
          )}
        </nav>

        {status === "loading" ? (
          <></>
        ) : session ? (
          <div className={styles.userSection}>
            <span className={styles.greeting}>Olá, {firstName}!</span>
            <button className={styles.logoutButton} onClick={() => signOut()}>
              <FiLogOut size={20} />
            </button>
          </div>
        ) : (
          <button
            className={styles.loginButton}
            onClick={() => signIn("google")}
          >
            Entrar
          </button>
        )}
      </div>
    </header>
  );
}
