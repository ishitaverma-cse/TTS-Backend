const { enhanceText } = require("./aiService");

const {
  generateSpeech,
} = require("./ttsService");

const generateEnhancedSpeech = async (
  text,
  language,
  voice,
  settings = {}
) => {
  // Step 1: Enhance text using Gemini
  const enhancedText = await enhanceText(text);

  // Step 2: Convert enhanced text to speech
  const speechResult = await generateSpeech(
    enhancedText,
    language,
    voice,
    settings
  );

  return {
    ...speechResult,
    originalText: text.trim(),
    enhancedText,
  };
};

module.exports = {
  generateEnhancedSpeech,
};