const express = require("express");
const { signup, verifyEmail, signin } = require("../controllers/auth.controller");

const router = express.Router();
// /resend-email verification link
// /forgot-password
// /reset-password
router.post("/signup", signup);
router.get("/verify-email", verifyEmail);
router.post("/signin", signin)


module.exports = router;