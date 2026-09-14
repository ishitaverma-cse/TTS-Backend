const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { extractFileText } = require("../controllers/fileController");

const router = express.Router();

router.post(
  "/extract",
  protect,
  upload.single("file"),
  extractFileText
);

module.exports = router;