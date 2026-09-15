const {
    generateEnhancedSpeech,
} = require("../services/enhancedTTSService");

const {
    saveSpeechHistory,
} = require("../services/historyService");

const {
    checkUsageLimit,
    incrementUsage,
} = require("../services/usageService");

const generateEnhancedSpeechController = async (req, res) => {
    try {
        // Check usage limit
        const usage = await checkUsageLimit(req.userId);

        if (!usage.allowed) {
            return res.status(429).json({
                success: false,
                message: "Usage limit reached",
                data: usage,
            });
        }

        const {
            text,
            language,
            voice,
            settings,
        } = req.body;

        // AI Enhancement → TTS
        const result = await generateEnhancedSpeech(
            text,
            language,
            voice,
            settings
        );
        
        // Save enhanced text in speech history
        await saveSpeechHistory(
            req.userId,
            result.enhancedText,
            result.language,
            result.voice
        );

        // Increment usage once
        await incrementUsage(req.userId);

        res.set({
            "Content-Type": "audio/mpeg",
            "Content-Disposition": 'inline; filename="enhanced-speech.mp3"',
        });

        return res
            .status(200)
            .send(Buffer.from(result.audioBuffer));
    } catch (error) {
        console.error(
            "Enhanced TTS Controller Error:",
            error.message
        );

        return res.status(error.statusCode || 500).json({
            success: false,
            error: {
                message: error.message,
            },
        });
    }
};

module.exports = {
    generateEnhancedSpeechController,
};