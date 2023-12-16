const express = require("express");
const passport = require("../config/passportDoctorStrategy");
const doctorController = require("../controller/doctorController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("doctorLogin");
});
router.get("/register", (req, res) => {
  res.render("doctorRegister");
});
router.post("/register", doctorController.register);
router.post(
  "/login",
  passport.authenticate("doctor-local", {
    successRedirect: "/doctors/profile",
    failureRedirect: "/doctors/login",
  })
);
router.get("/profile", authMiddleware, (req, res) => {
  const doctor = req.user;
  res.render("doctorProfile", { doctor });
});


module.exports = router;
