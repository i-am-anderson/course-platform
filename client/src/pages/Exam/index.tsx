import { useEffect, useState, type FormEvent } from "react";
import useFetch from "@/src/hooks/useFetch";
import useSidenavContext from "@/src/contexts/SidenavContext";
import examStorage from "@/src/data/examStorage";

import type { DataProps } from "@/types/data";
import type { ExamStorageProps, ExamQuestionProps } from "@/types/exam";

import styles from "./styles.module.scss";
import Feedback from "./components/Feedback";
import ExamBoard from "./components/ExamBoard";
import Score from "./components/Score";

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
  const [next, setNext] = useState(false);

  // Hook para requisição com controller.abort() e feedback
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

    // Array de inputs ou options (select)
    const inputs = Array.from(
      event.currentTarget.querySelectorAll<
        HTMLInputElement | HTMLSelectElement
      >('input[name="options"]:checked, select[name="options"]'),
    );

    // Retorno quando o usuário não seleciona alguma alternativa
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

    // Monta um array de números como gabarito para a questão, quais a(s) alternativas correta(s)
    const template = data?.options
      .filter(({ is_correct }) => is_correct === 1)
      .map(({ id }) => +id);

    // Verifica se a quantidade de alternativas selecionadas pelo usuário corresponde à quantidade correta
    // Verifica as respostas do usuário no template (todas precisam corresponder)
    if (
      template?.length === answerIds.length &&
      answerIds.every((id) => template.includes(id))
    ) {
      // Só entra aqui se acertou a questão...
      setExam((prev: ExamStorageProps) => {
        // Muda o status da pergunta e as tentativas usadas
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

        // Verifica se todas as questões estão completas
        const examCompleted = updatedQuestions.every(
          (question_: ExamQuestionProps) => question_.status === "completed",
        );

        // Calcula a pontuação do usuário
        const totalScore = examCompleted
          ? updatedQuestions
              .map((item: ExamQuestionProps) => item.remainingAttempts)
              .reduce((a: number, b: number) => a + b, 0)
          : 0;

        // Atualiza o objeto para se o exame está completo, qual foi a última questão respondida do usuário (importante
        // para saber qual pergunta voltar, caso o usuário saia da página), sua pontuação e insere os dados das perguntas
        // atualizadas anteriormente
        const updatedExam = {
          ...prev,
          status: examCompleted ? "completed" : "pending",
          last_question:
            count + 1 === exam.questions.length + 1
              ? prev.last_question
              : count + 1,
          score: totalScore,
          questions: updatedQuestions,
        };

        // Atualiza o local storage
        localStorage.setItem("exam", JSON.stringify(updatedExam));

        return updatedExam;
      });

      // Ativa o botão de próxima pergunta
      setNext(true);

      // Aviso de resposta correta
      setNotice("✅ Sua resposta está correta!");
      return;
    }

    const question = exam.questions.find(
      (question: ExamQuestionProps) => question.question_id === count,
    );
    if (question && question.remainingAttempts > 0) {
      // Só entra aqui se errou a questão
      setExam((prev: ExamStorageProps) => {
        // Muda o tentativas usadas
        const updatedQuestions = prev.questions.map(
          (question_: ExamQuestionProps) =>
            question_.question_id === count
              ? {
                  ...question_,
                  remainingAttempts: question_.remainingAttempts - 1,
                }
              : question_,
        );

        // Verifica se o usuário ainda tem tentativas restantes
        const examPending = updatedQuestions.every(
          (question: ExamQuestionProps) => question.remainingAttempts > 0,
        );

        // Atualiza o objeto para se o exame está pendente ou se falhou, qual foi a última questão respondida do usuário
        // insere os dados das perguntas atualizadas anteriormente
        const updatedExam = {
          ...prev,
          status: examPending ? "pending" : "failed",
          last_question: question.question_id,
          questions: updatedQuestions,
        };

        // Atualiza o local storage
        localStorage.setItem("exam", JSON.stringify(updatedExam));

        return updatedExam;
      });

      // Aviso de resposta incorreta
      setNotice("❌ Sua resposta está incorreta!");
    }
  };

  const handleClick = () => {
    // Reseta os estados e coloca o valor padrão no local storage
    setNotice(null);
    setCount(1);
    setExam(examStorage);
    setNext(false);
    localStorage.setItem("exam", JSON.stringify(examStorage));
  };

  useEffect(() => {
    changePageId("exame");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Se a requisição ainda estiver sendo feita...
  if (loading)
    return <p className={`${styles.exam__loading}`}>Carregando...</p>;

  // Se deu erro na requisição, por exemplo 500...
  if (error)
    return (
      <h3 className={`${styles.exam__error}`}>
        Ops! Não conseguimos carregar os dados no momento. Tente novamente mais
        tarde. <span>(API)</span>
      </h3>
    );

  // Se o usuário completou o exame mostra a pontuação
  if (exam.status === "completed") {
    return <Score exam={exam} handleClick={handleClick} />;
  }

  // Se o usuário ainda estiver preenchendo o exame ou se tiver errado alguma questão 3 vezes
  return (
    <div className={`${styles.exam}`}>
      {(exam.status === "pending" || exam.status === "failed") && (
        <>
          <ExamBoard
            data={data}
            notice={notice}
            setNotice={setNotice}
            next={next}
            setNext={setNext}
            count={count}
            setCount={setCount}
            handleSubmit={handleSubmit}
            examStatus={exam.status}
          />

          {/* Mostra se o usuário tiver errado alguma questão 3 vezes */}
          {exam.status === "failed" && (
            <Feedback data={data} handleClick={handleClick} />
          )}
        </>
      )}
    </div>
  );
};

export default Exam;
