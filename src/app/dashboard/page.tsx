import type { Metadata } from "next";
import styles from "./dashboard.module.css";
import { Textarea } from "@/components/textarea/Textarea";
import { FaShare, FaTrash } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Dashboard() {
  return (
    <div className={styles.pageContainer}>
      <main className={styles.mainContent}>
        <section className={styles.sectionForm}>
          <h1 className={styles.title}>Qual sua tarefa?</h1>

          <form action="">
            <Textarea
              name="nomeTarefa"
              id="nomeTarefa"
              placeholder="Digite sua terafa..."
            />

            <div className={styles.checkboxArea}>
              <input
                type="checkbox"
                name=""
                id=""
                className={styles.checkbox}
              />
              <label htmlFor="">Tornar tarefa pública?</label>
            </div>

            <button type="submit" className={styles.button}>
              Registrar
            </button>
          </form>
        </section>

        <hr className={styles.divisor} />

        <section className={styles.sectionTask}>
          <h1>Minhas tarefas</h1>

          <article className={styles.task}>
            <div className={styles.tagContainer}>
              <label className={styles.tag}>PÚBLICO</label>
              <button className={styles.shareButton}>
                <FaShare size={20} color="#0866ff" />
              </button>
            </div>

            <div className={styles.taskContent}>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                architecto repudiandae exercitationem, incidunt a ut, sint
                recusandae, nemo temporibus quam quaerat magni officia eius
                vitae. Modi suscipit quam rerum delectus!
              </p>

              <button className={styles.trashButton}>
                <FaTrash size={20} color="#ff4d4f" />
              </button>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
