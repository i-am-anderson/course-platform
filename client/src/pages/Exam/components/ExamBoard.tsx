import type { ExamBoardProps } from "@/types/exam";

import styles from "../styles.module.scss";
import Combobox from "@/src/components/Combobox";

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
        <p className={styles["examboard__form-title"]}>{data?.question}</p>
        <small className={styles["examboard__form-small"]}>
          {data?.type === "multiple"
            ? "* múltiplas respostas (3 tentativas)"
            : "* resposta única (3 tentativas)"}
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
          data?.options && <Combobox name="combobox" options={data?.options} setNotice={setNotice} disabled={next || examStatus === "failed"} />
        )}

        <button
          type="submit"
          className={styles["examboard__form-submit"]}
          disabled={next || examStatus === "failed"}
        >
          Verificar
        </button>
        {next && (
          <button
            className={styles["examboard__form-next"]}
            onClick={handleClick}
          >
            Próxima
          </button>
        )}
      </form>
      <span className={styles.examboard__notice}>{notice}</span>
    </div>
  );
};

export default ExamBoard;
