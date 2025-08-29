const express = require('express');
const router = express.Router();
const openaiService = require('../services/openaiService');

// --- Endpoint: Structured Output (JSON Mode) ---
// Use Case: Generating flashcards in a specific, reliable JSON format.

router.post('/generate-flashcards', async (req, res) => {
  const { topic, count = 3 } = req.body;
  if (!topic) {
    return res.status(400).json({ error: 'Topic is required.' });
  }

  const systemPrompt = "You are an AI assistant that only responds with valid, non-empty JSON.";

  // We still tell the model what we want in the prompt. This works with JSON mode
  // to ensure the structure of the JSON is what we expect.
  const userPrompt = `
    Generate ${count} flashcards about the topic: "${topic}".
    Return a JSON object with a single key "flashcards".
    The value of "flashcards" should be an array of objects, where each object has a "question" key and an "answer" key.
  `;

  try {
    // The service returns a string that is guaranteed to be valid JSON.
    const jsonString = await openaiService.generateStructuredResponse(systemPrompt, userPrompt);

    // --- KEY STEP: Parse the JSON string into a JavaScript object ---
    // We wrap this in a try/catch block as a best practice, although JSON mode
    // makes parsing failures extremely rare.
    try {
      const flashcardsObject = JSON.parse(jsonString);
      res.json(flashcardsObject);
    } catch (parseError) {
      console.error("Failed to parse JSON response from AI:", parseError);
      res.status(500).json({ error: "The AI returned an invalid JSON format." });
    }
    // ----------------------------------------------------------------

  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

module.exports = router;