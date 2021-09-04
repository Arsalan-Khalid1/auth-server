const express = require("express");
const { signup } = require("../controllers/auth");
const { userSignupValidator } = require("../validators/auth");
const { runValidation } = require("../validators");
const router = express.Router();

router.get("/sign_up", userSignupValidator, runValidation, signup);

module.exports = router;
