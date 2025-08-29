// routes/aiRoutes.js (AFTER the changes)
const express = require('express');
const router = express.Router();
const openaiService = require('../services/openaiService');

router.post('/solve-doubt', async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required.' });
  }

  // CHANGED: System and User prompts are now defined separately.
  const systemPrompt = "You are a friendly and knowledgeable AI tutor named Study Buddy. Explain concepts clearly and concisely, as if you are talking to a high school student. Always be encouraging.";
  const userPrompt = `Please explain the following concept: "${question}"`;

  try {
    // CHANGED: The service is now called with two distinct arguments.
    const explanation = await openaiService.generateResponse(systemPrompt, userPrompt);
    res.json({ answer: explanation });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

module.exports = router;