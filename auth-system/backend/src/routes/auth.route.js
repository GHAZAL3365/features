const express = require("express");
const { signup, verifyEmail } = require("../controllers/auth.controller");

const router = express.Router();

// /signup
// /verify-email
// /login
// /forgot-password
// /reset-password
router.post("/signup", signup);
router.get("/verify-email", verifyEmail);


module.exports = router;