const express = require("express");
const { signup } = require("../controllers/auth");
const router = express.Router();

router.get("/sign_up", signup);

module.exports = router;
