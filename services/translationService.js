const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const languageNames = {
  "en-US": "English",
  "hi-IN": "Hindi",
  "es-ES": "Spanish",
  "fr-FR": "French",
  "de-DE": "German",
  "it-IT": "Italian",
  "pt-BR": "Portuguese",
  "ja-JP": "Japanese",
  "zh-CN": "Chinese",
  "ko-KR": "Korean",
};

const translateText = async (text, targetLanguage) => {
  const targetLanguageName = languageNames[targetLanguage];

  if (!targetLanguageName) {
    throw new Error("Unsupported target language");
  }

  const prompt = `
Translate the following text into ${targetLanguageName}.

Rules:
- Preserve the original meaning exactly.
- Do not add new information.
- Do not remove important information.
- Make the translation natural and suitable for speech.
- Return ONLY the translated text.
- Do not include explanations, quotation marks, or labels.

Text:
${text}
`;

  const interaction = await ai.interactions.create({
    model: "gemini-3.8-flash",
    input: prompt,
  });

  return interaction.output_text.trim();
};

module.exports = {
  translateText,
};