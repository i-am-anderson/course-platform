/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, type FormEvent } from "react";
import useFetch from "@/src/hooks/useFetch";
import type { DataProps } from "@/types/data";
import styles from "./styles.module.scss";
import useSidenavContext from "@/src/contexts/SidenavContext";

type ExamQuestionProps = {
  question_id: number;
  status: "pending" | "completed";
  remainingAttempts: number;
};

type ExamStorageProps = {
  status: "pending" | "completed" | "failed";
  last_question: number;
  score: number;
  questions: ExamQuestionProps[];
};

const Exam = () => {
  const url = import.meta.env.VITE_API_URL;
  const examLocal = localStorage.getItem("exam");
  const examLocaljson = examLocal ? JSON.parse(examLocal) : null;
  const examStorage: ExamStorageProps = {
    status: "pending",
    last_question: 1,
    score: 0,
    questions: [
      {
        question_id: 1,
        status: "pending",
        remainingAttempts: 3,
      },
      {
        question_id: 2,
        status: "pending",
        remainingAttempts: 3,
      },
      {
        question_id: 3,
        status: "pending",
        remainingAttempts: 3,
      },
    ],
  };

  // Hooks
  const { changePageId } = useSidenavContext();
  const [exam, setExam] = useState(examLocaljson ? examLocaljson : examStorage);
  const [count, setCount] = useState(
    examLocaljson ? examLocaljson.last_question : examStorage.last_question,
  );
  const [notice, setNotice] = useState<string | null>(null);

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

    const template = data?.options
      .filter(({ is_correct }) => is_correct === 1)
      .map(({ id }) => +id);

    if (
      template?.length === answerIds.length &&
      answerIds.every((id) => template.includes(id))
    ) {
      // Só entra aqui se acertou a questão
      setExam((prev: any) => {
        const updatedQuestions = prev.questions.map((q: any) =>
          q.question_id === count
            ? {
                ...q,
                status: "completed",
                remainingAttempts: q.remainingAttempts,
              }
            : q,
        );

        const examCompleted = updatedQuestions.every(
          (q: any) => q.status === "completed",
        );

        const totalScore = examCompleted
          ? updatedQuestions
              .map((item: ExamQuestionProps) => item.remainingAttempts)
              .reduce((a: number, b: number) => a + b, 0)
          : 0;

        const updatedExam = {
          ...prev,
          status: examCompleted ? "completed" : "pending",
          last_question:
            count + 1 === prev.questions.length
              ? prev.last_question
              : count + 1,
          score: totalScore,
          questions: updatedQuestions,
        };

        localStorage.setItem("exam", JSON.stringify(updatedExam));

        return updatedExam;
      });

      setCount(count + 1);
      return;
    }

    const question = exam.questions.find(
      (q: ExamQuestionProps) => q.question_id === count,
    );
    if (question && question.remainingAttempts > 0) {
      // Só entra aqui se errou a questão
      setExam((prev: any) => {
        const updatedQuestions = prev.questions.map((q: any) =>
          q.question_id === count
            ? { ...q, remainingAttempts: q.remainingAttempts - 1 }
            : q,
        );

        const examPending = updatedQuestions.every(
          (q: any) => q.remainingAttempts > 0,
        );

        const updatedExam = {
          ...prev,
          status: examPending ? "pending" : "failed",
          questions: updatedQuestions,
        };

        localStorage.setItem("exam", JSON.stringify(updatedExam));

        return updatedExam;
      });

      setNotice("Sua resposta está incorreta!");
    }
  };

  const handleClick = () => {
    setNotice(null);
    setCount(1);
    setExam(examStorage);
  };

  useEffect(() => {
    changePageId("exame");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <>Carregando...</>;
  if (error) return <></>;

  if (exam.status === "completed") {
    return (
      <div>
        <h1>Sua Pontuação:</h1>
        <h3>{((exam.score / 9) * 100).toFixed(1)}%</h3>
        <button onClick={handleClick}>Reiniciar teste</button>
      </div>
    );
  }

  return (
    <div className={`${styles.exam}`}>
      <h1>Exame</h1>
      {exam.status === "pending" ? (
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
              .map(({ text, id }) => (
                <li key={id}> - {text}</li>
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
