import type { DataProps } from "./data";

export type ExamQuestionProps = {
  question_id: number;
  status: "pending" | "completed";
  remainingAttempts: number;
};

export type ExamStorageProps = {
  status: "pending" | "completed" | "failed";
  last_question: number;
  score: number;
  questions: ExamQuestionProps[];
};

export type FeedbackProps = {
  data: DataProps | null;
  handleClick: () => void;
};

export type ExamBoardProps = {
  data: DataProps | null;
  notice: string | null;
  setNotice: React.Dispatch<React.SetStateAction<string | null>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};