const express = require("express");

const {
  getHistory,
  deleteHistory,
  favoriteHistory,
  getFavorites,
  getTrash,
  restoreHistory,
  permanentlyDeleteHistory,
} = require("../controllers/historyController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getHistory);

router.get("/favorites", protect, getFavorites);

router.get("/trash", protect, getTrash);

router.patch("/:id/favorite", protect, favoriteHistory);

router.patch("/:id/restore", protect, restoreHistory);

router.delete("/:id/permanent", protect, permanentlyDeleteHistory);

router.delete("/:id", protect, deleteHistory);

module.exports = router;