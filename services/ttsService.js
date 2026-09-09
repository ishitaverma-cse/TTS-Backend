const generateSpeech = async (text, language, voice) => {
  // TTS provider integration will be added here
  return {
    text,
    language,
    voice,
    message: "TTS Service is working",
  };
};

module.exports = {
  generateSpeech,
};