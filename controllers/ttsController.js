const {
  generateSpeech: generateSpeechService,
} = require("../services/ttsService");

const generateSpeech = async (req, res) => {
  try {
    const { text, language, voice } = req.body;

    const result = await generateSpeechService(text, language, voice);

    res.set({
      "Content-Type": "audio/mpeg",
      "Content-Disposition": "inline; filename=\"speech.mp3\"",
    });

    res.status(200).send(Buffer.from(result.audioBuffer));
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