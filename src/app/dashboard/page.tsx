import type { Metadata } from "next";
import styles from "./dashboard.module.css";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Dashboard() {
  return (
    <div className={styles.pageContainer}>
      <h1>Dashboard</h1>
    </div>
  );
}
