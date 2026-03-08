const User = require("../models/user.model");
const { verifyUserData } = require("../validations/user.validte");
const crypto = require("crypto");
const sendVerificationEmail = require("../services/emailService");

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

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000;
    await User.create({
      name,
      email,
      password,
      verificationToken,
      verificationTokenExpires,
    });

    const verificationTokenLink =
      "http://localhost:3365/api/v1/auth/verify-email?token=" +
      verificationToken;
    await sendVerificationEmail(email, verificationTokenLink);

    return res.status(201).json({
      message: "User registered successfully. Please verify you email.",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal server error",
    });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "token is required",
      });
    }

    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "user not found",
      });
    }

    user.isVerified = true;

    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Your Email is verified. You can login now",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

module.exports = {
  signup,
  verifyEmail,
};
