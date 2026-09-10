const {
  generateSpeech: generateSpeechService,
} = require("../services/ttsService");

const generateSpeech = async (req, res) => {
  try {
    const { text, language, voice } = req.body;

    const result = await generateSpeechService(text, language, voice);

    res.status(200).json({
      success: true,
      message: "Speech generated successfully",
      data: result,
    });
  } catch (error) {
    console.error("TTS Controller Error:", error.message);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  generateSpeech,
};