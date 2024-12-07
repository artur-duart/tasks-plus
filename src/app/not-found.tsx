import Image from "next/image";
import sonicGif from "../../public/assets/sonic-waiting.gif";
import styles from "@/styles/not-found.module.css";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Image
          src={sonicGif}
          height={150}
          width={150}
          alt="Sonic, um ouriço antropomórfico azul, esperando impacientemente."
          className={styles.sonicGif}
        />
        <div className={styles.grid}>
          <h1 className={styles.error}>Oops! Página não encontrada</h1>
          <p className={styles.description}>
            Provavelmente isso foi um erro. Vamos te ajudar a voltar à jornada!
          </p>
          <Link href="/" className={styles.homeButton}>
            Voltar para a Página Inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
