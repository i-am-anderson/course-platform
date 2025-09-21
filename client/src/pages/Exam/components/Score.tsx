import React from "react";
import styles from "../styles.module.scss";
import type { ExamStorageProps } from "@/types/exam";

type Props = {
  exam: ExamStorageProps;
  handleClick: () => void;
};

const Score = ({ exam, handleClick }: Props) => {
  const score = ((exam.score / 9) * 100).toFixed(1);

  return (
    <div className={styles.score}>
      <h1 className={styles.score__title}>Sua Pontuação:</h1>
      <h3 className={styles.score__score}>{score.replace(".",",")} / 100</h3>
      <button className={styles.score__button} onClick={handleClick}>
        Reiniciar teste
      </button>
    </div>
  );
};

export default Score;
