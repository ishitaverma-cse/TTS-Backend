require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");


const ttsRoutes = require("./routes/ttsRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

connectDB()

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tts", ttsRoutes);
app.use("/api/auth", authRoutes);

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