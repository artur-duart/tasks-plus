"use client";

import styles from "./dashboard.module.css";
import { Textarea } from "@/components/textarea/Textarea";
import { FaShare, FaTrash } from "react-icons/fa";
import { ChangeEvent, FormEvent, useState } from "react";
import { db } from "@/services/fireBaseConnectiont";
import { addDoc, collection } from "firebase/firestore";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const [input, setInput] = useState("");
  const [publicTask, setPublicTask] = useState(false);

  const { data: session } = useSession();

  async function handleRegisterTask(e: FormEvent) {
    e.preventDefault();

    if (input === "") return;

    const user = session?.user;

    try {
      await addDoc(collection(db, "tasks"), {
        task: input,
        created: new Date(),
        user: user?.email,
        public: publicTask,
      });

      setInput("");
      setPublicTask(false);
    } catch (err) {
      console.log("Erro ao registrar tarefa:", err);
    }
  }

  return (
    <>
      <div className={styles.pageContainer}>
        <main className={styles.mainContent}>
          <section className={styles.sectionForm}>
            <h1 className={styles.title}>Qual sua tarefa?</h1>

            <form onSubmit={handleRegisterTask}>
              <Textarea
                name="nomeTarefa"
                id="nomeTarefa"
                placeholder="Digite sua tarefa..."
                value={input}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setInput(e.target.value)
                }
              />

              <div className={styles.checkboxArea}>
                <input
                  type="checkbox"
                  name="checkbox"
                  id="checkbox"
                  className={styles.checkbox}
                  checked={publicTask}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPublicTask(e.target.checked)
                  }
                />
                <label htmlFor="checkbox">Tornar tarefa pública?</label>
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
    </>
  );
}
