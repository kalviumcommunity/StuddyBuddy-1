const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generates a response from GPT-4 using a system and user prompt.
 * @param {string} systemPrompt - The instruction that defines the AI's role.
 * @param {string} userPrompt - The user's specific request, which includes CoT instructions.
 * @returns {Promise<string>} - The AI's generated text response.
 */
async function generateResponse(systemPrompt, userPrompt) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { "role": "system", "content": systemPrompt },
        { "role": "user", "content": userPrompt }
      ],
      // Use a low temperature for logical reasoning tasks
      temperature: 0.2,
      // Allow more tokens for a detailed, step-by-step explanation
      max_tokens: 1000,
    });

    console.log("Token Usage:", response.usage);
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw new Error("Failed to generate AI response.");
  }
}

module.exports = { generateResponse };