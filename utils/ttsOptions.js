const supportedLanguages = [
  { code: "en-US", name: "English (US)" },
  { code: "hi-IN", name: "Hindi (India)" },
  { code: "es-ES", name: "Spanish" },
  { code: "fr-FR", name: "French" },
  { code: "de-DE", name: "German" },
  { code: "it-IT", name: "Italian" },
  { code: "pt-BR", name: "Portuguese" },
  { code: "ja-JP", name: "Japanese" },
  { code: "zh-CN", name: "Chinese" },
  { code: "ko-KR", name: "Korean" },
];

const getDefaultVoice = () => {
  return process.env.ELEVENLABS_VOICE_ID;
};

module.exports = {
  supportedLanguages,
  getDefaultVoice,
};