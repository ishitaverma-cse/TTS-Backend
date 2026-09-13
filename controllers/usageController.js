const User = require("../models/User");

const getUsage = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const remaining = Math.max(
      user.usageLimit - user.usageCount,
      0
    );

    res.status(200).json({
      success: true,
      data: {
        usageCount: user.usageCount,
        usageLimit: user.usageLimit,
        remaining,
      },
    });

  } catch (error) {
    console.error("Usage Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve usage",
    });
  }
};

module.exports = {
  getUsage,
};