const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const { enhanceTextController } = require("../controllers/aiController");

const router = express.Router();

router.post("/enhance", protect, enhanceTextController);

module.exports = router;