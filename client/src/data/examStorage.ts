import type { ExamStorageProps } from "@/types/exam";

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

export default examStorage;
