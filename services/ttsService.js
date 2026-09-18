const { translateText } = require("./translationService");

const createError = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;

  return error;
};
const supportedLanguageCodes = [
  "en-US",
  "hi-IN",
  "es-ES",
  "fr-FR",
  "de-DE",
  "it-IT",
  "pt-BR",
  "ja-JP",
  "zh-CN",
  "ko-KR",
];

const {
  voiceSettings,
} = require("../utils/voiceOptions");

const generateSpeech = async (
  text,
  language,
  voice,
  settings = {}
) => {
  // Validate text
  if (!text || typeof text !== "string" || !text.trim()) {
    throw createError("Valid text is required", 400);
  }

  // Validate language
  if (
    !language ||
    typeof language !== "string" ||
    !supportedLanguageCodes.includes(language)
  ) {
    throw createError("Unsupported language", 400);
  }

  // Validate voice
  if (!voice || typeof voice !== "string") {
    throw createError("Valid voice is required", 400);
  }

  const cleanText = text.trim();

  let speechText = cleanText;

  if (language !== "en-US") {
    speechText = await translateText(cleanText, language);
  }

  const stability = settings.stability ?? voiceSettings.stability.default;

  const similarityBoost =
    settings.similarityBoost ??
    voiceSettings.similarityBoost.default;

  const style =
    settings.style ??
    voiceSettings.style.default;

  const speed =
    settings.speed ?? voiceSettings.speed.default;

  // Use default ElevenLabs voice when "default" is provided
  const voiceId =
    voice === "default"
      ? process.env.ELEVENLABS_VOICE_ID
      : voice;

  if (!voiceId) {
    throw createError(
      "ElevenLabs voice ID is not configured",
      500
    );
  }

  if (!process.env.ELEVENLABS_API_KEY) {
    throw createError(
      "ElevenLabs API key is not configured",
      500
    );
  }

  let response;

  // Call ElevenLabs API
  try {
    response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: speechText,
          model_id: "eleven_multilingual_v2",

          voice_settings: {
            stability,
            similarity_boost: similarityBoost,
            style,
            speed,
          },
        }),
      }
    );
  } catch (error) {
    throw createError(
      `Unable to connect to ElevenLabs: ${error.message}`,
      503
    );
  }

  // Handle ElevenLabs API errors
  if (!response.ok) {
    const errorBody = await response.text();

    throw createError(
      `ElevenLabs API Error (${response.status}): ${errorBody}`,
      response.status === 429 ? 429 : 502
    );
  }

  const audioBuffer = await response.arrayBuffer();

  return {
    audioBuffer,
    text: speechText,
    language,
    voice: voiceId,
    message: "Speech generated successfully",
  };
};

module.exports = {
  generateSpeech,
};