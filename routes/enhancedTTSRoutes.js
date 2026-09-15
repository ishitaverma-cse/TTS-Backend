const express = require("express");

const { protect } = require("../middleware/authMiddleware");

const {
  generateEnhancedSpeechController,
} = require("../controllers/enhancedTTSController");

const router = express.Router();

router.post(
  "/enhanced",
  protect,
  generateEnhancedSpeechController
);

module.exports = router;