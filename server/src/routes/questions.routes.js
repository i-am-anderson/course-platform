import express from "express";

import {
  searchQuestionById,
  verifyAnswerById,
} from "../services/questions.service.js";

const router = express.Router();

router.get("/api/v1/question/:id", async (req, res) => {
  const questionId = req.params.id;

  try {
    const result = await searchQuestionById({
      questionId,
    });

    res.status(200).send(result);
  } catch (err) {
    console.error("Error: ", err.message);
    res.status(500).json({ error: err.message });
  }
});

router.get("/api/v1/verify/question/:questionId", async (req, res) => {
  const questionId = req.params.questionId;

  try {
    const result = await verifyAnswerById({
      questionId,
    });

    res.status(200).send(result);
  } catch (err) {
    console.error("Error: ", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
