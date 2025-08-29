const express = require('express');
const router = express.Router();
const openaiService = require('../services/openaiService');

// --- Endpoint: Multi-Shot Prompting ---
// Use Case: Generating a high-quality multiple-choice quiz. We provide several
// examples to teach the AI the desired JSON structure and the quality of questions
// and distractor options.

router.post('/create-quiz', async (req, res) => {
  const { topic, count = 3 } = req.body;
  if (!topic) {
    return res.status(400).json({ error: 'Topic is required.' });
  }

  const systemPrompt = "You are an expert educator who creates high-quality multiple-choice quizzes in a strict JSON format. Do not include any text outside of the JSON array.";

  // The user prompt contains MULTIPLE examples to guide the AI. This is Multi-Shot.
  const userPrompt = `
    Create a quiz with ${count} multiple-choice questions on the topic: "${topic}".
    Return a valid JSON array of objects. Each object must have a "question" string, an "options" array of 4 strings, and a "correctAnswer" string that exactly matches one of the options.

    Here are a few examples of the required format and quality:
    [
      {
        "question": "Which planet is known as the Red Planet?",
        "options": ["Earth", "Mars", "Jupiter", "Venus"],
        "correctAnswer": "Mars"
      },
      {
        "question": "What is the chemical symbol for water?",
        "options": ["O2", "H2O", "CO2", "NaCl"],
        "correctAnswer": "H2O"
      },
      {
        "question": "Who wrote the play 'Romeo and Juliet'?",
        "options": ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        "correctAnswer": "William Shakespeare"
      }
    ]

    Now, generate the quiz based on these examples.
  `;

  try {
    const response = await openaiService.generateResponse(systemPrompt, userPrompt);
    // The AI returns a string that looks like JSON. We parse it to send real JSON to the client.
    const quiz = JSON.parse(response);
    res.json({ quiz });
  } catch (error) {
    // This catch block handles errors if the AI returns non-JSON text
    console.error("Failed to parse AI response as JSON:", error);
    res.status(500).json({ error: 'An error occurred or the AI response was not valid JSON.' });
  }
});

module.exports = router;