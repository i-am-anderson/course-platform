import React from "react";
import type { FeedbackProps } from "@/types/exam";

const Feedback = ({ data, handleClick }: FeedbackProps) => {
  return (
    <div>
      <h2>Feedback</h2>

      <h3>
        {data?.type === "multiple"
          ? "Respostas corretas:"
          : "Resposta correta:"}
      </h3>
      <ul>
        {data?.options
          .filter(({ is_correct }) => is_correct === 1)
          .map(({ text, id }) => (
            <li key={id}> - {text}</li>
          ))}
      </ul>

      <h3>Por quê?</h3>
      <p>{data?.feedback}</p>

      <button onClick={handleClick}>Reiniciar teste</button>
    </div>
  );
};

export default Feedback;
