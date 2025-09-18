import express from "express";
import questions from "./questions.routes.js";

const router = express.Router();

router.use(questions);

export default router;
