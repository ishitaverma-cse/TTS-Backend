const { enhanceText } = require("../services/aiService");

const enhanceTextController = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Text is required",
      });
    }

    const enhancedText = await enhanceText(text.trim());

    return res.status(200).json({
      success: true,
      data: {
        originalText: text.trim(),
        enhancedText,
      },
    });
  } catch (error) {
    console.error("AI Enhancement Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to enhance text",
    });
  }
};

module.exports = {
  enhanceTextController,
};