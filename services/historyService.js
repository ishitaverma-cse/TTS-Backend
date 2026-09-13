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
    voice
  });

  return history;
};

const getSpeechHistory = async (userId) => {
  const history = await SpeechHistory.find({
    user: userId,
  }).sort({
    createdAt: -1,
  });

  return history;
};

const deleteSpeechHistory = async (
  userId,
  historyId
) => {
  const history = await SpeechHistory.findOneAndDelete({
    _id: historyId,
    user: userId,
  });

  return history;
};

const toggleFavorite = async (
  userId,
  historyId
) => {
  const history = await SpeechHistory.findOne({
    _id: historyId,
    user: userId,
  });

  if (!history) {
    return null;
  }

  history.isFavorite = !history.isFavorite;

  await history.save();

  return history;
};

const getFavoriteHistory = async (userId) => {
  const favorites = await SpeechHistory.find({
    user: userId,
    isFavorite: true,
  }).sort({
    createdAt: -1,
  });

  return favorites;
};

module.exports = {
  saveSpeechHistory,
  getSpeechHistory,
  deleteSpeechHistory,
  toggleFavorite,
  getFavoriteHistory,
};