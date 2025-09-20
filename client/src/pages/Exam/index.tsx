import { useEffect, useState, type FormEvent } from "react";
import useFetch from "@/src/hooks/useFetch";
import useSidenavContext from "@/src/contexts/SidenavContext";
import examStorage from "@/src/data/examStorage";

import type { DataProps } from "@/types/data";
import type { ExamStorageProps, ExamQuestionProps } from "@/types/exam";

import styles from "./styles.module.scss";
import Feedback from "./components/Feedback";
import ExamBoard from "./components/ExamBoard";

const Exam = () => {
  const url = import.meta.env.VITE_API_URL;
  const examLocal = localStorage.getItem("exam");
  const examLocaljson = examLocal ? JSON.parse(examLocal) : null;

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
      setExam((prev: ExamStorageProps) => {
        const updatedQuestions = prev.questions.map(
          (question_: ExamQuestionProps) =>
            question_.question_id === count
              ? ({
                  ...question_,
                  status: "completed",
                  remainingAttempts: question_.remainingAttempts,
                } as ExamQuestionProps)
              : question_,
        );

        const examCompleted = updatedQuestions.every(
          (question_: ExamQuestionProps) => question_.status === "completed",
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
      setExam((prev: ExamStorageProps) => {
        const updatedQuestions = prev.questions.map(
          (question_: ExamQuestionProps) =>
            question_.question_id === count
              ? {
                  ...question_,
                  remainingAttempts: question_.remainingAttempts - 1,
                }
              : question_,
        );

        const examPending = updatedQuestions.every(
          (q: ExamQuestionProps) => q.remainingAttempts > 0,
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
      {exam.status === "pending" ? (
        <ExamBoard
          data={data}
          notice={notice}
          setNotice={setNotice}
          handleSubmit={handleSubmit}
        />
      ) : (
        <Feedback data={data} handleClick={handleClick} />
      )}
    </div>
  );
};

export default Exam;
