const {
  generateSpeech: generateSpeechService,
} = require("../services/ttsService");

const generateSpeech = async (req, res) => {
  try {
    const { text, language, voice } = req.body;

    const result = await generateSpeechService(text, language, voice);

    res.status(200).json({
      success: true,
      message: "Speech generation service is working",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to generate speech",
    });
  }
};

module.exports = {
  generateSpeech,
};