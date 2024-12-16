"use client";

import styles from "./dashboard.module.css";
import { Textarea } from "@/components/textarea/Textarea";
import { FaShare, FaTrash } from "react-icons/fa";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { db } from "@/services/fireBaseConnectiont";
import {
  addDoc,
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
} from "firebase/firestore";
import { useSession } from "next-auth/react";

interface TaskProps {
  id: string;
  createdAt: Date;
  public: boolean;
  task: string;
  user: string;
}

export default function Dashboard() {
  const [input, setInput] = useState("");
  const [publicTask, setPublicTask] = useState(false);
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    async function loadTasks() {
      if (!user?.email) return;

      const refTasks = collection(db, "tasks");
      const q = query(
        refTasks,
        orderBy("createdAt", "desc"),
        where("user", "==", user.email),
      );

      onSnapshot(q, (snapshot) => {
        let list = [] as TaskProps[];

        snapshot.forEach((element) => {
          list.push({
            id: element.id,
            task: element.data().task,
            createdAt: element.data().createdAt,
            user: element.data().user,
            public: element.data().public,
          });
        });

        setTasks(list);
      });
    }

    loadTasks();
  }, [user?.email]);

  async function handleRegisterTask(e: FormEvent) {
    e.preventDefault();

    if (input === "") return;

    try {
      await addDoc(collection(db, "tasks"), {
        task: input,
        createdAt: new Date(),
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

            {tasks.map((task) => (
              <article className={styles.task} key={task.id}>
                {task.public ? (
                  <div className={styles.tagContainer}>
                    <label className={styles.publicTag}>PÚBLICO</label>
                    <button className={styles.shareButton}>
                      <FaShare size={20} color="#0866ff" />
                    </button>
                  </div>
                ) : (
                  <div className={styles.tagContainer}>
                    <label className={styles.privateTag}>PRIVADO</label>
                  </div>
                )}

                <div className={styles.taskContent}>
                  <p>{task.task}</p>

                  <button className={styles.trashButton}>
                    <FaTrash size={20} color="#ff4d4f" />
                  </button>
                </div>
              </article>
            ))}
          </section>
        </main>
      </div>
    </>
  );
}
