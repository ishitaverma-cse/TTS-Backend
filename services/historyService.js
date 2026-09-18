const SpeechHistory = require("../models/SpeechHistory");

const saveSpeechHistory = async (
  userId,
  text,
  language,
  voice
) => {
  const history = await SpeechHistory.create({
    user: userId,
    text,
    language,
    voice,
  });

  return history;
};

const getSpeechHistory = async (
  userId,
  page = 1,
  limit = 8
) => {
  const skip = (page - 1) * limit;

  const history = await SpeechHistory.find({
    user: userId,
    isDeleted: false,
  })
    .sort({
      createdAt: -1,
    })
    .skip(skip)
    .limit(limit);

  const total = await SpeechHistory.countDocuments({
    user: userId,
    isDeleted: false,
  });

  return {
    history,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const deleteSpeechHistory = async (
  userId,
  historyId
) => {
  const history = await SpeechHistory.findOneAndUpdate(
    {
      _id: historyId,
      user: userId,
      isDeleted: false,
    },
    {
      isDeleted: true,
      deletedAt: new Date(),
    },
    {
      new: true,
    }
  );

  return history;
};

const restoreSpeechHistory = async (
  userId,
  historyId
) => {
  const history = await SpeechHistory.findOneAndUpdate(
    {
      _id: historyId,
      user: userId,
      isDeleted: true,
    },
    {
      isDeleted: false,
      deletedAt: null,
    },
    {
      new: true,
    }
  );

  return history;
};

const permanentlyDeleteSpeechHistory = async (
  userId,
  historyId
) => {
  const history = await SpeechHistory.findOneAndDelete({
    _id: historyId,
    user: userId,
    isDeleted: true,
  });

  return history;
};

const getTrashHistory = async (
  userId,
  page = 1,
  limit = 8
) => {
  const skip = (page - 1) * limit;

  const trash = await SpeechHistory.find({
    user: userId,
    isDeleted: true,
  })
    .sort({
      deletedAt: -1,
    })
    .skip(skip)
    .limit(limit);

  const total = await SpeechHistory.countDocuments({
    user: userId,
    isDeleted: true,
  });

  return {
    trash,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const toggleFavorite = async (
  userId,
  historyId
) => {
  const history = await SpeechHistory.findOne({
    _id: historyId,
    user: userId,
    isDeleted: false,
  });

  if (!history) {
    return null;
  }

  history.isFavorite = !history.isFavorite;

  await history.save();

  return history;
};

const getFavoriteHistory = async (
  userId,
  page = 1,
  limit = 8
) => {
  const skip = (page - 1) * limit;

  const favorites = await SpeechHistory.find({
    user: userId,
    isFavorite: true,
    isDeleted: false,
  })
    .sort({
      createdAt: -1,
    })
    .skip(skip)
    .limit(limit);

  const total = await SpeechHistory.countDocuments({
    user: userId,
    isFavorite: true,
    isDeleted: false,
  });

  return {
    favorites,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

module.exports = {
  saveSpeechHistory,
  getSpeechHistory,
  deleteSpeechHistory,
  restoreSpeechHistory,
  permanentlyDeleteSpeechHistory,
  getTrashHistory,
  toggleFavorite,
  getFavoriteHistory,
};