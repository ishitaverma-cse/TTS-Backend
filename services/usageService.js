const User = require("../models/User");

const checkUsageLimit = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.usageCount >= user.usageLimit) {
    return {
      allowed: false,
      usageCount: user.usageCount,
      usageLimit: user.usageLimit,
      remaining: 0,
    };
  }

  return {
    allowed: true,
    usageCount: user.usageCount,
    usageLimit: user.usageLimit,
    remaining: user.usageLimit - user.usageCount,
  };
};


const incrementUsage = async (userId) => {
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $inc: {
        usageCount: 1,
      },
    },
    {
      new: true,
    }
  );

  if (!user) {
    throw new Error("User not found");
  }

  return {
    usageCount: user.usageCount,
    usageLimit: user.usageLimit,
    remaining: Math.max(
      user.usageLimit - user.usageCount,
      0
    ),
  };
};


module.exports = {
  checkUsageLimit,
  incrementUsage,
};