const express = require("express");

const {
  getUsage,
} = require("../controllers/usageController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getUsage);

module.exports = router;