const Patient = require("../models/patientModel");

const register = async (req, res) => {
  try {
    const { phoneNumber, name } = req.body;

    // Simple input validation for phone number and name
    if (
      !phoneNumber ||
      typeof phoneNumber !== "string" ||
      phoneNumber.length < 10 ||
      !name ||
      typeof name !== "string"
    ) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const existingPatient = await Patient.findOne({ phoneNumber });

    if (existingPatient) {
      // If patient already exists, redirect to the patient profile page
      return res.redirect(`/patients/${existingPatient._id}`);
    }

    const newPatient = new Patient({ phoneNumber, name });
    await newPatient.save();

    // Redirect to the patient profile page after registration
    res.redirect(`/patients/${newPatient._id}`);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const getPatientById = async (req, res, next) => {
  const patientId = req.params.id;

  try {
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    req.patient = patient;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  register,
  getPatientById,
};
