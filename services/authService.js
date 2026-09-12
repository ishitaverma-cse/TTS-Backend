const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");

const registerUser = async (name, email, password) => {
  // Database logic will be added on Day 10
};

const loginUser = async (email, password) => {
  // Database logic will be added on Day 10
};

module.exports = {
  registerUser,
  loginUser,
};