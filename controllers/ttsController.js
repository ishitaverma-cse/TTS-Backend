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

const {
  checkUsageLimit,
  incrementUsage,
} = require("../services/usageService");

const generateSpeech = async (req, res) => {
  try {
    const usage = await checkUsageLimit(req.userId);

    if (!usage.allowed) {
      return res.status(429).json({
        success: false,
        message: "Usage limit reached",
        data: usage,
      });
    }
    const { text, language, voice, settings } = req.body;

    const result = await generateSpeechService(
      text,
      language,
      voice,
      settings
    );

    await saveSpeechHistory(
      req.userId,
      result.text,
      result.language,
      result.voice
    );

    const updatedUsage = await incrementUsage(
      req.userId
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