import Image from "next/image";
import styles from "@/styles/home.module.css";
import heroImage from "../../public/assets/hero.svg";

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      <main className={styles.mainContent}>
        <Image
          className={styles.heroImage}
          alt="Ilustração de um homem com camiseta azul e uma mulher com camiseta preta, interagindo com elementos gráficos que estão sendo arrastados e soltos em uma tela de computador."
          src={heroImage}
        />

        <h1 className={styles.title}>
          O sistema feito para você organizar seus estudos e tarefas
        </h1>

        <div className={styles.infoContainer}>
          <span className={styles.info}>+12 posts</span>

          <span className={styles.info}>+90 comentários</span>
        </div>
      </main>
    </div>
  );
}
