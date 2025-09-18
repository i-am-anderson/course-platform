export type DataProps = {
  question_id: number;
  question: string;
  type: "multiple" | "single";
  options: OptionsProps[];
};

export type OptionsProps = {
  id: number;
  text: string;
  is_correct: 0 | 1;
};