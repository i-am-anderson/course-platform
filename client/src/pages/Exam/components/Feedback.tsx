import React from "react";
import type { FeedbackProps } from "@/types/exam";
import styles from "../styles.module.scss";

const Feedback = ({ data, handleClick }: FeedbackProps) => {
  return (
    <div className={styles.feedback}>
      <h3 className={styles.feedback__title}>
        {data?.type === "multiple"
          ? "Respostas corretas:"
          : "Resposta correta:"}
      </h3>
      <ul className={styles.feedback__list}>
        {data?.options
          .filter(({ is_correct }) => is_correct === 1)
          .map(({ text, id }) => (
            <li className={styles.feedback__item} key={id}> - {text}</li>
          ))}
      </ul>

      <h3 className={styles.feedback__title}>Por quê?</h3>
      <p className={styles.feedback__paragraph}>{data?.feedback}</p>

      <button className={styles.feedback__button} onClick={handleClick}>Reiniciar teste</button>
    </div>
  );
};

export default Feedback;
