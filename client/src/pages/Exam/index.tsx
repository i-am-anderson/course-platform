import { useState, type FormEvent } from "react";
import useFetch from "@/src/hooks/useFetch";
import type { DataProps } from "@/types/data";
import styles from "./styles.module.scss";

const Exam = () => {
  const url = import.meta.env.VITE_API_URL;

  const scoreBase = 12;
  const qtyAttempt = 3;
  const qtyQuestions = 3;

  const [notice, setNotice] = useState<string | null>(null);
  const [count, setCount] = useState(1);
  const [attempt, setAttempt] = useState(1);
  const [score, setScore] = useState(0);

  const {
    loading,
    error,
    data,
  }: { data: DataProps | null; loading: boolean; error: string | null } =
    useFetch(`${url}/api/v1/question/${count}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputs = Array.from(
      event.currentTarget.querySelectorAll<
        HTMLInputElement | HTMLSelectElement
      >('input[name="options"]:checked, select[name="options"]'),
    ); // Ajuste de tipagem por IA

    if (inputs.length === 0) {
      setNotice("É necessário selecionar pelo menos uma alternativa!");
      return;
    }

    // Type Guard
    const answerIds = inputs.map((input) => {
      // Se for radio ou checkbox
      if (input instanceof HTMLInputElement) return +input.id;
      // Se for select
      else return +input.value;
    });

    console.log("Hello World!", answerIds);

    const template = data?.options
      .filter(({ is_correct }) => is_correct === 1)
      .map(({ id }) => +id);

    if (
      template?.length === answerIds.length &&
      answerIds.every((id) => template.includes(id))
    ) {
      setScore(score + scoreBase / attempt);
      setAttempt(1);
      setCount(count + 1);
      return;
    }

    if (attempt <= qtyAttempt) {
      setAttempt(attempt + 1);
      setNotice("Sua resposta está incorreta!");
    }
  };

  const handleClick = () => {
    setNotice(null);
    setCount(1);
    setAttempt(1);
    setScore(0);
  };

  if (loading) return <>Carregando...</>;
  if (error) return <></>;

  if (count > qtyQuestions)
    return (
      <div>
        <h1>Sua Pontuação:</h1>
        <h4>{score}</h4>
        <button onClick={handleClick}>Reiniciar teste</button>
      </div>
    );

  return (
    <div className={`${styles.exam}`}>
      <h1>Exam</h1>
      {attempt <= qtyAttempt ? (
        <div>
          <form onSubmit={handleSubmit}>
            <h2>{data?.question}</h2>
            <small>
              {data?.type === "multiple"
                ? "* múltiplas respostas"
                : "* resposta única"}
            </small>

            {data?.type === "multiple" ||
            (data?.type === "single" && data?.question_id % 3 !== 0) ? (
              <ul>
                {data?.options.map(({ id, text }) => (
                  <li key={id}>
                    <input
                      type={data?.type === "multiple" ? "checkbox" : "radio"}
                      name="options"
                      id={id.toString()}
                      value={text}
                      onChange={() => setNotice(null)}
                    />
                    <label htmlFor={id.toString()}>{text}</label>
                  </li>
                ))}
              </ul>
            ) : (
              <select
                name="options"
                id="options"
                onChange={() => setNotice(null)}
              >
                <option disabled>Selecione uma resposta</option>
                {data?.options.map(({ id, text }) => (
                  <option key={id} value={id}>
                    {text}
                  </option>
                ))}
              </select>
            )}

            <button type="submit">Verificar</button>
          </form>
          <span>{notice}</span>
        </div>
      ) : (
        <div>
          <h2>Feedback</h2>

          <h4>
            {data?.type === "multiple"
              ? "Respostas corretas:"
              : "Resposta correta:"}
          </h4>
          <ul>
            {data?.options
              .filter(({ is_correct }) => is_correct === 1)
              .map(({ text }) => (
                <li> - {text}</li>
              ))}
          </ul>

          <h4>Por quê?</h4>
          <p>{data?.feedback}</p>

          <button onClick={handleClick}>Reiniciar teste</button>
        </div>
      )}
    </div>
  );
};

export default Exam;
