import Question from "../models/question-model.js";

export const getQuestionsByTopic = async (req, res) => {
  const { topic } = req.query;

  if (!topic) {
    return res.status(400).json({ message: "Topic is required" });
  }

  try {
    // Search for questions where the topic contains the search string (case-insensitive)
    const questions = await Question.find({
      topic: { $regex: topic, $options: "i" },
    });

    res.status(200).json({ questions });
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions", error: error.message });
  }
};

export const addQuestion = async (req, res) => {
  const { topic, question, answer, difficulty } = req.body;

  try {
    const newQuestion = new Question({ topic, question, answer, difficulty });
    await newQuestion.save();
    res.status(201).json({ message: "Question added successfully", question: newQuestion });
  } catch (error) {
    res.status(500).json({ message: "Error adding question", error: error.message });
  }
};
