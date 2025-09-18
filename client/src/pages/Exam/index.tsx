import { useEffect, useState, type FormEvent } from "react";
import useFetch from "../../hooks/useFetch";
import type { DataProps } from "../../../types/data";

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

  useEffect(() => {
    if (loading || error || !data) return;

    console.log("Hello World!", data);
  }, [data, error, loading]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const questionId = data?.questionId;
    const inputs = Array.from(
      event.currentTarget.querySelectorAll<HTMLInputElement>(
        'input[name="options"]:checked',
      ),
    ); // Ajuste de tipagem por IA
    const answerIds = inputs.map((input) => +input.id);

    //
    const req = await fetch(`${url}/api/v1/verify/question/${questionId}`);
    const res = await req.json();
    const template = res.map(({ id }: { id: number }) => id);

    if (
      template.length === answerIds.length &&
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
    <div>
      <h1>Exam</h1>
      <p>Tentativa: {attempt}</p>
      {correct !== null && (
        <p>Resposta: {correct ? "resposta correta" : "resposta errada"}</p>
      )}
      <div>
        <form onSubmit={handleSubmit}>
          <h2>{data?.question}</h2>
          <ul>
            {data?.options.map(({ answerId, answer }) => (
              <li key={answerId}>
                <input
                  type={data?.type === "multiple" ? "checkbox" : "radio"}
                  name="options"
                  id={answerId.toString()}
                  value={answer}
                />
                <label htmlFor={answerId.toString()}>{answer}</label>
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
