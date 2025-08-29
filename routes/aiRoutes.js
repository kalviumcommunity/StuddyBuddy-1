const express = require('express');
const router = express.Router();
const openaiService = require('../services/openaiService');

// A simple endpoint to explain a concept
router.post('/explain-concept', async (req, res) => {
  const { concept } = req.body;
  if (!concept) {
    return res.status(400).json({ error: 'Concept is required.' });
  }

  const systemPrompt = "You are a helpful AI tutor.";
  const userPrompt = `Briefly explain the concept of: "${concept}"`;

  try {
    const explanation = await openaiService.generateResponse(systemPrompt, userPrompt);
    res.json({ explanation });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred.' });
  }
});

module.exports = router;