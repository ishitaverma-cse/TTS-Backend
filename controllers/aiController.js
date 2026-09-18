const { enhanceText } = require("../services/aiService");

const enhanceTextController = async (req, res) => {
    console.log("AI service completed");
    console.log("Sending response to frontend");

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

        if (error.status === 429 || error.code === "too_many_requests") {
            return res.status(429).json({
                success: false,
                message:
                    "AI quota exceeded. Please try again after the cooldown period.",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to enhance text",
        });
    }
};

module.exports = {
    enhanceTextController,
};