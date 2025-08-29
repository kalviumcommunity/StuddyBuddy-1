const express = require('express');
const router = express.Router();
const openaiService = require('../services/openaiService');

// --- Endpoint: Chain-of-Thought (CoT) Prompting ---
// Use Case: Solving a math or logic word problem where the reasoning process is crucial.

router.post('/solve-word-problem', async (req, res) => {
  const { problem } = req.body;
  if (!problem) {
    return res.status(400).json({ error: 'A problem statement is required.' });
  }

  const systemPrompt = "You are a meticulous and logical math tutor. Your goal is to solve the user's problem by showing every step of your reasoning, making it easy for a student to follow along.";

  // This is the Chain-of-Thought prompt.
  // We are not just asking for the answer; we are commanding a specific thought process.
  const userPrompt = `
    Please solve the following word problem. Follow these steps exactly:
    1.  **Identify Key Information:** List the important numbers, variables, and conditions from the problem statement.
    2.  **State the Goal:** Clearly state what needs to be calculated or found.
    3.  **Formulate a Plan:** Describe the formula or logical steps you will take to solve the problem.
    4.  **Execute the Plan:** Show your work and calculations step-by-step. Explain each calculation as you perform it.
    5.  **Final Answer:** State the final answer clearly in a concluding sentence.

    Here is the problem:
    "${problem}"
  `;

  try {
    const solution = await openaiService.generateResponse(systemPrompt, userPrompt);
    res.json({ solution });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

module.exports = router;