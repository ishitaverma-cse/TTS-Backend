const {
  generateSpeech: generateSpeechService,
} = require("../services/ttsService");

const {
  saveSpeechHistory,
} = require("../services/historyService");

const {
  supportedLanguages,
  getDefaultVoice,
} = require("../utils/ttsOptions");

const generateSpeech = async (req, res) => {
  try {
    const { text, language, voice } = req.body;

    const result = await generateSpeechService(
      text,
      language,
      voice
    );

    await saveSpeechHistory(
      req.userId,
      result.text,
      result.language,
      result.voice
    );

    res.set({
      "Content-Type": "audio/mpeg",
      "Content-Disposition": 'inline; filename="speech.mp3"',
    });

    res.status(200).send(Buffer.from(result.audioBuffer));
  } catch (error) {
    console.error("TTS Controller Error:", error.message);

    res.status(error.statusCode || 500).json({
      success: false,
      error: {
        message: error.message,
      },
    });
  }
};

const getTTSOptions = (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      languages: supportedLanguages,
      defaultVoice: getDefaultVoice(),
    },
  });
};

module.exports = {
  generateSpeech,
  getTTSOptions,
};