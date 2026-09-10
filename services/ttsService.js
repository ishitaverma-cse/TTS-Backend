const generateSpeech = async (text, language, voice) => {
  // Basic validation
  if (!text || !text.trim()) {
    throw new Error("Text is required");
  }

  if (!language) {
    throw new Error("Language is required");
  }

  if (!voice) {
    throw new Error("Voice is required");
  }

  // Use default ElevenLabs voice when "default" is provided
  const voiceId =
    voice === "default"
      ? process.env.ELEVENLABS_VOICE_ID
      : voice;

  if (!voiceId) {
    throw new Error("ElevenLabs voice ID is not configured");
  }

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
    {
      method: "POST",
      headers: {
        "xi-api-key": process.env.ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text.trim(),
        model_id: "eleven_multilingual_v2",
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();

    throw new Error(
      `ElevenLabs API Error (${response.status}): ${error}`
    );
  }

  const audioBuffer = await response.arrayBuffer();

  return {
    audioBuffer,
    text,
    language,
    voice: voiceId,
    message: "Speech generated successfully",
  };
};

module.exports = {
  generateSpeech,
};