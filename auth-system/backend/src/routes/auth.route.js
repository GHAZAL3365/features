const express = require("express");
const { signup } = require("../controllers/auth.controller");

const router = express.Router();

// /signup
// /verify-email
// /login
// /forgot-password
// /reset-password
router.post("/signup", signup);


module.exports = router;