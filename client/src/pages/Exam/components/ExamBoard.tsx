import React from "react";
import type { ExamBoardProps } from "@/types/exam";

import styles from "../styles.module.scss";

const ExamBoard = ({
  data,
  notice,
  setNotice,
  handleSubmit,
  next,
  setNext,
  count,
  setCount,
  examStatus,
}: ExamBoardProps) => {
  const handleClick = () => {
    setNext(false);
    setNotice(null);
    setCount(count + 1);
  };

  return (
    <div className={styles.examboard}>
      <h1 className={styles.examboard__title}>Exame</h1>
      <form onSubmit={handleSubmit} className={styles.examboard__form}>
        <h2 className={styles["examboard__form-title"]}>{data?.question}</h2>
        <small className={styles["examboard__form-small"]}>
          {data?.type === "multiple"
            ? "* múltiplas respostas"
            : "* resposta única"}
        </small>

        {data?.type === "multiple" ||
        (data?.type === "single" && data?.question_id % 3 !== 0) ? (
          <ul className={styles["examboard__form-list"]}>
            {data?.options.map(({ id, text }) => (
              <li className={styles["examboard__form-item"]} key={id}>
                <input
                  type={data?.type === "multiple" ? "checkbox" : "radio"}
                  className={styles["examboard__form-input"]}
                  name="options"
                  id={id.toString()}
                  value={text}
                  onChange={() => setNotice(null)}
                  disabled={next || examStatus === "failed"}
                />
                <label
                  className={styles["examboard__form-label"]}
                  htmlFor={id.toString()}
                >
                  {text}
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <select
            className={styles["examboard__form-select"]}
            name="options"
            id="options"
            onChange={() => setNotice(null)}
            disabled={next || examStatus === "failed"}
          >
            <option className={styles["examboard__form-option"]} disabled>
              Selecione uma resposta
            </option>
            {data?.options.map(({ id, text }) => (
              <option
                className={styles["examboard__form-option"]}
                value={id}
                key={id}
              >
                {text}
              </option>
            ))}
          </select>
        )}

        <button
          type="submit"
          className={styles["examboard__form-submit"]}
          disabled={next || examStatus === "failed"}
        >
          Verificar
        </button>
        {next && (
          <button className={styles["examboard__form-next"]} onClick={handleClick}>
            Próxima
          </button>
        )}
      </form>
      <span className={styles.examboard__notice}>{notice}</span>
    </div>
  );
};

export default ExamBoard;
