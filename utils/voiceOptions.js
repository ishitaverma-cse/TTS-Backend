const voiceSettings = {
  stability: {
    min: 0,
    max: 1,
    default: 0.5,
  },

  similarityBoost: {
    min: 0,
    max: 1,
    default: 0.75,
  },

  style: {
    min: 0,
    max: 1,
    default: 0,
  },

  speed: {
    min: 0.7,
    max: 1.2,
    default: 1,
  },
};

module.exports = {
  voiceSettings,
};