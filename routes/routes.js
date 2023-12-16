const express = require("express");
const router = express.Router();
const userModel = require("../controller/usrController");

router.post("/signup", userModel.signup);

module.exports = router;
