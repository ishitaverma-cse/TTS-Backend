const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const enhanceText = async (text) => {
  const prompt = `
You are an AI text enhancement assistant for a Text-to-Speech application.

Improve the following text so that it sounds natural, clear, and grammatically correct when spoken aloud.

Rules:
- Fix grammar and punctuation.
- Improve sentence structure and readability.
- Make the wording natural for speech.
- Preserve the original meaning.
- Do not add new facts or information.
- Do not remove important information.
- Return ONLY the enhanced text.
- Do not include explanations, quotation marks, or labels.

Original text:
${text}
`;

  const interaction = await ai.interactions.create({
    model: "gemini-3.8-flash",
    input: prompt,
  });

  return interaction.output_text.trim();
};

module.exports = {
  enhanceText,
};