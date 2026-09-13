const express = require("express");

const {
  getHistory,
  deleteHistory,
  favoriteHistory,
  getFavorites,
} = require("../controllers/historyController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getHistory);

router.get("/favorites", protect, getFavorites);

router.patch("/:id/favorite", protect, favoriteHistory);

router.delete("/:id", protect, deleteHistory);

module.exports = router;