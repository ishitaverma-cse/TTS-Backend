const express = require("express");
const { generateSpeech, getTTSOptions } = require("../controllers/ttsController");
const router = express.Router();



router.post("/", generateSpeech);
router.get("/options", getTTSOptions);


module.exports = router;