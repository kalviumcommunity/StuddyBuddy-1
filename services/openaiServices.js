const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generates a response from GPT-4 and logs the token usage.
 * @param {string} systemPrompt - The instruction that defines the AI's role.
 *  @param {string} userPrompt - The user's specific request.
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
      temperature: 0.5,
      max_tokens: 250,
    });

    // --- THIS IS THE KEY IMPLEMENTATION ---
    // The 'response' object from OpenAI includes a 'usage' field.
    // We log this field to the console to make the token count visible.
    console.log("--- TOKEN USAGE ---");
    console.log(`Prompt Tokens: ${response.usage.prompt_tokens}`);
    console.log(`Completion Tokens: ${response.usage.completion_tokens}`);
    console.log(`Total Tokens: ${response.usage.total_tokens}`);
    console.log("---------------------");
    // ------------------------------------

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw new Error("Failed to generate AI response.");
  }
}

module.exports = { generateResponse };