const OpenAI = require('openai');

// Initialize the OpenAI client with the API key from the .env file
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generates a response from GPT-4 using a system and user prompt.
 * @param {string} systemPrompt - The instruction that defines the AI's role and constraints.
 * @param {string} userPrompt - The user's specific question or request.
 * @returns {Promise<string>} - The AI's generated text response.
 */
async function generateResponse(systemPrompt, userPrompt) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4", // Or "gpt-3.5-turbo" for faster, cheaper responses
      messages: [
        {
          "role": "system",
          "content": systemPrompt
        },
        {
          "role": "user",
          "content": userPrompt
        }
      ],
      temperature: 0.3, // Lower temperature for more factual, less random responses
      max_tokens: 250,  // Limit the length of the response
    });

    // Log token usage to the console for monitoring costs
    console.log("Token Usage:", response.usage);

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw new Error("Failed to generate AI response.");
  }
}

module.exports = { generateResponse };