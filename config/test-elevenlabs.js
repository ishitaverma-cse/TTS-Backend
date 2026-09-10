require("dotenv").config();

const testConnection = async () => {
  try {
    const response = await fetch(
      "https://api.elevenlabs.io/v1/text-to-speech/JBFqnCBsd6RMkjVDRZzb?output_format=mp3_44100_128",
      {
        method: "POST",
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: "Hello, this is my Text-to-Speech application.",
          model_id: "eleven_multilingual_v2",
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Status ${response.status}: ${error}`);
    }

    const audioBuffer = await response.arrayBuffer();

    console.log("✅ ElevenLabs TTS connection successful!");
    console.log(`Audio received: ${audioBuffer.byteLength} bytes`);
  } catch (error) {
    console.error("❌ ElevenLabs TTS connection failed!");
    console.error(error.message);
  }
};

testConnection();