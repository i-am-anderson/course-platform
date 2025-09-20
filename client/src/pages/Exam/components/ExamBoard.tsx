import React from "react";
import type { ExamBoardProps } from "@/types/exam";

const ExamBoard = ({
  data,
  notice,
  setNotice,
  handleSubmit,
}: ExamBoardProps) => {
  return (
    <div>
      <h1>Exame</h1>

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
          <select name="options" id="options" onChange={() => setNotice(null)}>
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
  );
};

export default ExamBoard;
