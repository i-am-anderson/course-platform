import { openDb } from "../db/db.js";

export async function searchQuestionById({ questionId }) {
  try {
    const db = await openDb();

    const query =
      "SELECT * FROM questions LEFT JOIN options ON questions.id = options.question_id WHERE questions.id = ? ";
    let results = await db.all(query, [questionId]);

    const options = results.map(({ id, text, is_correct }) => ({
      id,
      text,
      is_correct
    }));

    if (results.length === 0) {
      throw new Error("Nada encontrado no DB!");
    }

    const res = {
      question_id: results[0].question_id,
      question: results[0].question,
      feedback: results[0].feedback,
      type: results[0].type,
      options,
    };

    return res;
  } catch (err) {
    console.error("Error: ", err.message);
    throw new Error("Erro ao buscar questão.");
  }
}

export async function verifyAnswerById({ questionId }) {
  try {
    const db = await openDb();

    const query =
      "SELECT * FROM options WHERE question_id = ? AND options.is_correct = 1";
    let results = await db.all(query, [questionId]);

    if (results.length === 0) {
      throw new Error("Nada encontrado no DB!");
    }

    return results;
  } catch (err) {
    console.error("Error: ", err.message);
    throw new Error("Erro ao buscar questão ou resposta.");
  }
}
