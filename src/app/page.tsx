import Image from "next/image";
import styles from "@/styles/home.module.css";
import heroImage from "../../public/assets/hero.svg";

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      <main className={styles.mainContent}>
        <div className={styles.heroContainer}>
          <Image
            className={styles.heroImage}
            alt="Ilustração de um homem com camiseta azul e uma mulher com camiseta preta, interagindo com elementos gráficos que estão sendo arrastados e soltos em uma tela de computador."
            src={heroImage}
          />
        </div>
        <h1 className={styles.title}>
          Sistema feito para você organizar <br />
          seus estudos e tarefas
        </h1>
      </main>
    </div>
  );
}
