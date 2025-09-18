import { openDb } from "../db/db.js";

export async function searchQuestionById({ questionId }) {
  try {
    const db = await openDb();

    const query =
      "SELECT * FROM questions LEFT JOIN options ON questions.id = options.question_id WHERE questions.id = ? ";
    let results = await db.all(query, [questionId]);

    const options = results.map(({ id, text }) => ({
      answerId: id,
      answer: text,
    }));

    if (results.length === 0) {
      throw new Error("Nada encontrado no DB!");
    }

    results = {
      questionId: questionId,
      question: results[0].question,
      type: results[0].type,
      options,
    };

    return results;
  } catch (err) {
    console.error("Error: ", err.message);
    throw new Error("Erro ao buscar questão.");
  }
}

export async function verifyAnswerById({ questionId, answerId }) {
  try {
    const db = await openDb();

    const query =
      "SELECT * FROM options WHERE question_id = ? AND id = ? LIMIT 1";
    let results = await db.all(query, [questionId, answerId]);

    if (results.length === 0) {
      throw new Error("Nada encontrado no DB!");
    }

    results = {
      answerId: answerId,
      answer: results[0].text,
      isCorrect: !!results[0].is_correct,
    };

    return results;
  } catch (err) {
    console.error("Error: ", err.message);
    throw new Error("Erro ao buscar questão ou resposta.");
  }
}
