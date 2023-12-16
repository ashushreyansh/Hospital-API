const Doctor = require("../models/doctorModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret, expiresIn } = require("../config/jwt");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the doctor with the given email already exists
    const existingDoctor = await Doctor.findOne({ email });

    if (existingDoctor) {
      // If the doctor already exists, return their data
      return res.status(200).json({
        doctor: existingDoctor,
        message: "Doctor already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newDoctor = new Doctor({
      email,
      password: hashedPassword,
    });

    await newDoctor.save();

    return res.status(201).json({ message: "Doctor registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Doctor.findOne({ email });

    if (!user) {
      res.status(401).json({ error: "No such account was found" });
      return;
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ error: "Incorrect password" });
      return;
    }

    req.session.user = { id: user._id, email: user.email };

    // Redirect to the desired route
    res.redirect("/patients/register");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  register,
  login,
};
