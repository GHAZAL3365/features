const User = require("../models/user.model");
const { verifyUserData } = require("../validations/user.validte");
const crypto = require("crypto");
const sendVerificationEmail = require("../services/emailService");

const jwt = require("jsonwebtoken");

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

    user.verificationToken = null;
    user.verificationTokenExpires = null;

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

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email",
      });
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" },
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" },
    );

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (err) {
    console.log("error:", err.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
module.exports = {
  signup,
  verifyEmail,
  signin,
};
