const {
  registerUser,
  loginUser,
} = require("../services/authService");


const register = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const result = await registerUser(
      name,
      email,
      password
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });

  } catch (error) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};


const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const result = await loginUser(
      email,
      password
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });

  } catch (error) {

    res.status(401).json({
      success: false,
      message: error.message,
    });

  }
};


module.exports = {
  register,
  login,
};