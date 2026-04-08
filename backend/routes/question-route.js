import express from "express";
import { getQuestionsByTopic, addQuestion } from "../controller/question-controller.js";

const router = express.Router();

router.get("/search", getQuestionsByTopic);
router.post("/add", addQuestion);

export default router;
