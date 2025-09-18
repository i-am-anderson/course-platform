import { useState, type FormEvent } from "react";
import useFetch from "@/src/hooks/useFetch";
import type { DataProps } from "@/types/data";
import styles from "./styles.module.scss"

const Exam = () => {
  const qtyAttempt = 3;
  const url = import.meta.env.VITE_API_URL;

  const [correct, setCorrect] = useState<boolean | null>(null);
  const [attempt, setAttempt] = useState<number>(1);

  const {
    loading,
    error,
    data,
  }: { data: DataProps | null; loading: boolean; error: string | null } =
    useFetch(`${url}/api/v1/question/1`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputs = Array.from(
      event.currentTarget.querySelectorAll<HTMLInputElement>(
        'input[name="options"]:checked',
      ),
    ); // Ajuste de tipagem por IA

    const answerIds = inputs.map((input) => +input.id);
    const template = data?.options.filter(({ is_correct }) => is_correct === 1).map(({id})=>+id)

    if (
      template?.length === answerIds.length &&
      answerIds.every((id) => template.includes(id))
    ) {
      return setCorrect(true);
    } else {
      setCorrect(false);
      setAttempt(attempt+1)
      return 
    }
  };

  if (loading) return <>Carregando...</>;
  if (error) return <></>;

  return (
    <div className={`${styles.exam}`}>
      <h1>Exam</h1>
      <p>Tentativa: {attempt}</p>
      {correct !== null && (
        <p>Resposta: {correct ? "resposta correta" : "resposta errada"}</p>
      )}
      <div>
        <form onSubmit={handleSubmit}>
          <h2>{data?.question}</h2>
          <ul>
            {data?.options.map(({ id, text }) => (
              <li key={id}>
                <input
                  type={data?.type === "multiple" ? "checkbox" : "radio"}
                  name="options"
                  id={id.toString()}
                  value={text}
                />
                <label htmlFor={id.toString()}>{text}</label>
              </li>
            ))}
          </ul>

          <button type="submit">Verificar</button>
        </form>
      </div>
    </div>
  );
};

export default Exam;
