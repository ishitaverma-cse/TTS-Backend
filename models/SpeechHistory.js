const mongoose = require("mongoose");

const speechHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
    },

    language: {
      type: String,
      required: true,
    },

    voice: {
      type: String,
      required: true,
    },

    isFavorite: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const SpeechHistory = mongoose.model(
  "SpeechHistory",
  speechHistorySchema
);

module.exports = SpeechHistory;