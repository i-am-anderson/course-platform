import type { DataProps } from "./data";

export type StatusProps = "pending" | "completed" | "failed";

export type ExamQuestionProps = {
  question_id: number;
  status: Omit<StatusProps, "failed">;
  remainingAttempts: number;
};

export type ExamStorageProps = {
  status: StatusProps;
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
  next: boolean;
  setNext: React.Dispatch<React.SetStateAction<boolean>>;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  examStatus: StatusProps;
};
