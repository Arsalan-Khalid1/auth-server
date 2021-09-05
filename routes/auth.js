const express = require("express");
const { signup, accountActivation, signin } = require("../controllers/auth");
const {
  userSignupValidator,
  userSigninValidator,
} = require("../validators/auth");
const { runValidation } = require("../validators");
const router = express.Router();

router.post("/sign_up", userSignupValidator, runValidation, signup);
router.post("/account-activation", accountActivation);

router.post("/signin", userSigninValidator, runValidation, signin);
module.exports = router;
