const express = require("express");
const { generateSpeech, getTTSOptions } = require("../controllers/ttsController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");



router.post("/", protect, generateSpeech);
router.get("/options", getTTSOptions);


module.exports = router;