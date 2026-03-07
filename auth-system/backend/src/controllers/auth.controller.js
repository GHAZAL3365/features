const User = require("../models/user.model");
const { verifyUserData } = require("../validations/user.validte");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const dataValidateError = verifyUserData(req.body);

    if (dataValidateError) {
      return res.status(400).json({
        message: dataValidateError,
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists with this email",
      });
    }

    await User.create({
      name,
      email,
      password,
    });

    return res.status(201).json({
      message: "User registered successfully. Please verify you email.",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal server error",
    });
  }
};

module.exports = {
  signup
}