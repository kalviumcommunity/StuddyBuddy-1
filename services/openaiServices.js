// services/openaiService.js (AFTER the changes)
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generates a response from GPT-4 using a separate system and user prompt.
 * @param {string} systemPrompt - The instruction that defines the AI's role and constraints.
 * @param {string} userPrompt - The user's specific question or request.
 * @returns {Promise<string>} - The AI's generated text response.
 */
async function generateResponse(systemPrompt, userPrompt) { // CHANGED: Now accepts two parameters
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        // CHANGED: Now uses the 'system' role for instructions
        {
          "role": "system",
          "content": systemPrompt
        },
        // CHANGED: Now uses the 'user' role for the specific question
        {
          "role": "user",
          "content": userPrompt
        }
      ],
      temperature: 0.3, // Lowered for more factual responses
      max_tokens: 250,
    });

    console.log("Token Usage:", response.usage);
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw new Error("Failed to generate AI response.");
  }
}

module.exports = { generateResponse };