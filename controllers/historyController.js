const {
  getSpeechHistory,
  deleteSpeechHistory,
  restoreSpeechHistory,
  permanentlyDeleteSpeechHistory,
  getTrashHistory,
  toggleFavorite,
  getFavoriteHistory,
} = require("../services/historyService");

const getHistory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;

    const result = await getSpeechHistory(
      req.userId,
      page,
      limit
    );

    res.status(200).json({
      success: true,
      data: result.history,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error("Get History Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve speech history",
    });
  }
};

const deleteHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const history = await deleteSpeechHistory(
      req.userId,
      id
    );

    if (!history) {
      return res.status(404).json({
        success: false,
        message: "Speech history not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Speech history moved to trash",
      data: history,
    });
  } catch (error) {
    console.error("Delete History Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to move speech history to trash",
    });
  }
};

const favoriteHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const history = await toggleFavorite(
      req.userId,
      id
    );

    if (!history) {
      return res.status(404).json({
        success: false,
        message: "Speech history not found",
      });
    }

    res.status(200).json({
      success: true,
      message: history.isFavorite
        ? "Speech added to favorites"
        : "Speech removed from favorites",
      data: history,
    });
  } catch (error) {
    console.error("Favorite History Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to update favorite",
    });
  }
};

const getFavorites = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;

    const result = await getFavoriteHistory(
      req.userId,
      page,
      limit
    );

    res.status(200).json({
      success: true,
      data: result.favorites,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error("Get Favorites Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve favorites",
    });
  }
};

const getTrash = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;

    const result = await getTrashHistory(
      req.userId,
      page,
      limit
    );

    res.status(200).json({
      success: true,
      data: result.trash,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error("Get Trash Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve trash",
    });
  }
};

const restoreHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const history = await restoreSpeechHistory(
      req.userId,
      id
    );

    if (!history) {
      return res.status(404).json({
        success: false,
        message: "Speech history not found in trash",
      });
    }

    res.status(200).json({
      success: true,
      message: "Speech history restored successfully",
      data: history,
    });
  } catch (error) {
    console.error("Restore History Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to restore speech history",
    });
  }
};

const permanentlyDeleteHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const history = await permanentlyDeleteSpeechHistory(
      req.userId,
      id
    );

    if (!history) {
      return res.status(404).json({
        success: false,
        message: "Speech history not found in trash",
      });
    }

    res.status(200).json({
      success: true,
      message: "Speech history permanently deleted",
    });
  } catch (error) {
    console.error(
      "Permanent Delete History Error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to permanently delete speech history",
    });
  }
};

module.exports = {
  getHistory,
  deleteHistory,
  favoriteHistory,
  getFavorites,
  getTrash,
  restoreHistory,
  permanentlyDeleteHistory,
};