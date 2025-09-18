export type OptionsProps = {
  answerId: number;
  answer: string;
};

export type DataProps = {
  questionId: number;
  question: string;
  type: "multiple" | "single";
  options: OptionsProps[];
};

export type AnswerProps = {
  id: number;
  question_id: number;
  text: string;
  is_correct: number;
};