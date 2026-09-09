const express = require("express");
const cors = require("cors");
require("dotenv").config();

const ttsRoutes = require("./routes/ttsRoutes");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/tts", ttsRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "TTS Backend is running!!",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});