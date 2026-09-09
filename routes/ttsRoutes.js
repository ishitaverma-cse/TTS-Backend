const express = require("express");
const { generateSpeech } = require("../controllers/ttsController");
const router = express.Router();



router.post("/", generateSpeech);


module.exports = router;