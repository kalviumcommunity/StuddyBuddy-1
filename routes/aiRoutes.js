const express = require('express');
const router = express.Router();
const openaiService = require('../services/openaiService');

// Define a POST endpoint for solving academic doubts
router.post('/solve-doubt', async (req, res) => {
  // Extract the user's question from the request body
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Question is required.' });
  }

  // 1. Define the System Prompt (The AI's role and rules)
  const systemPrompt = "You are a friendly and knowledgeable AI tutor named Study Buddy. Explain concepts clearly and concisely, as if you are talking to a high school student. Always be encouraging.";

  // 2. Define the User Prompt (The user's specific request)
  const userPrompt = `Please explain the following concept: "${question}"`;

  try {
    // 3. Call the service to get the AI's response
    const explanation = await openaiService.generateResponse(systemPrompt, userPrompt);
    res.json({ answer: explanation });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

module.exports = router;