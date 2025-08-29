const express = require('express');
const router = express.Router();
const openaiService = require('../services/openaiService');

// --- Endpoint 1: Zero-Shot Prompting ---
// Use Case: General academic doubt solving. The AI is expected to know the answer
// without needing any examples in the prompt.

router.post('/solve-doubt', async (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ error: 'Question is required.' });
  }

  const systemPrompt = "You are an expert AI tutor. Explain concepts clearly and accurately.";
  
  // The user prompt is direct and provides NO examples. This is Zero-Shot.
  const userPrompt = `Explain the following concept: "${question}"`;

  try {
    const explanation = await openaiService.generateResponse(systemPrompt, userPrompt);
    res.json({ answer: explanation });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred.' });
  }
});


// --- Endpoint 2: One-Shot Prompting ---
// Use Case: Generating flashcards in a specific JSON format. We provide one
// example to guide the AI to produce the correct structure.

router.post('/generate-flashcards', async (req, res) => {
  const { topic, count = 3 } = req.body;
  if (!topic) {
    return res.status(400).json({ error: 'Topic is required.' });
  }

  const systemPrompt = "You are a helpful assistant that creates learning materials in a strict JSON format.";

  // The user prompt contains ONE clear example of the desired output format. This is One-Shot.
  const userPrompt = `
    Create ${count} flashcards for the topic: "${topic}".
    Return the result as a valid JSON array of objects, where each object has a "question" and an "answer" key. Do not include any other text or explanations.

    Here is one example of the required format:
    [
      {"question": "What is the powerhouse of the cell?", "answer": "The mitochondria"}
    ]
  `;

  try {
    const response = await openaiService.generateResponse(systemPrompt, userPrompt);
    // The AI returns a string that looks like JSON. We parse it to send real JSON to the client.
    const flashcards = JSON.parse(response);
    res.json({ flashcards });
  } catch (error) {
    // This catch block can also handle errors if the AI returns non-JSON text
    console.error("Failed to parse AI response as JSON:", error);
    res.status(500).json({ error: 'An error occurred or the AI response was not valid JSON.' });
  }
});

module.exports = router;