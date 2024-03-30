const express = require("express");

const router = express.Router();

const { registerUser, loginUser } = require("../Controller/userController");

// Signup endpoint
router.route("/signup").post(registerUser);

router.route("/login").post(loginUser);

module.exports = router;
