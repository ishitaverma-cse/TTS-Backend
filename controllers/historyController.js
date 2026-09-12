const {
  getSpeechHistory,
  deleteSpeechHistory,
} = require("../services/historyService");

const getHistory = async (req, res) => {
  try {

    const history = await getSpeechHistory(req.userId);

    res.status(200).json({
      success: true,
      data: history,
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
      message: "Speech history deleted successfully",
    });

  } catch (error) {

    console.error("Delete History Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to delete speech history",
    });
  }
};

module.exports = {
  getHistory,
  deleteHistory,
};