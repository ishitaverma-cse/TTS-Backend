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

const getSpeechHistory = async (userId) => {

  const history = await SpeechHistory.find({
    user: userId,
  }).sort({
    createdAt: -1,
  });

  return history;
};

const deleteSpeechHistory = async (userId, historyId) => {

  const history = await SpeechHistory.findOneAndDelete({
    _id: historyId,
    user: userId,
  });

  return history;
};

module.exports = {
  saveSpeechHistory,
  getSpeechHistory,
  deleteSpeechHistory,
};