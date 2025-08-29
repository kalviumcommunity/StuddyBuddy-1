const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generates a structured JSON response from GPT-4.
 * @param {string} systemPrompt - The instruction that defines the AI's role.
 * @param {string} userPrompt - The user's specific request.
 * @returns {Promise<string>} - The AI's generated text response, guaranteed to be a JSON string.
 */
async function generateStructuredResponse(systemPrompt, userPrompt) {
  try {
    const response = await openai.chat.completions.create({
      // Use a model that supports JSON mode (e.g., gpt-4-1106-preview, gpt-3.5-turbo-1106)
      model: "gpt-4-1106-preview", 
      messages: [
        { "role": "system", "content": systemPrompt },
        { "role": "user", "content": userPrompt }
      ],
      // --- THIS IS THE KEY IMPLEMENTATION ---
      // This parameter forces the model to return a valid JSON object.
      response_format: { type: "json_object" },
      // ------------------------------------
    });

    console.log("Token Usage:", response.usage);
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw new Error("Failed to generate AI response.");
  }
}

module.exports = { generateStructuredResponse };