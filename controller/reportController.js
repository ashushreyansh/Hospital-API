const Report = require("../models/reportModel");
const Patient = require("../models/patientModel");
const Doctor = require("../models/doctorModel");

const createReport = async (req, res) => {
  try {
    const { category, status } = req.body;
    if (!req.patient || !req.patient.name || !req.patient.phoneNumber) {
      console.error("Patient data is missing or incomplete.");
      return res.status(400).json({ error: "Invalid patient data" });
    }
    const newReport = new Report({
      doctor: req.user._id,
      patient: req.patient._id,
      patientName: req.patient.name,
      patientPhoneNumber: req.patient.phoneNumber,
      category,
      status,
    });

    await newReport.save();

    // Redirect back to the patient profile page after creating the report
    res.redirect(`/patients/${req.params.id}`);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllReportsByPatientId = async (req, res) => {
  try {
    const { id: patientId } = req.params;

    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const reports = await Report.find({ patient: patientId }).sort({
      date: "asc",
    });

    return res.status(200).json({ patient, reports });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getReportsByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    // Fetch reports based on the provided status
    const reports = await Report.find({ status });
    if (!reports){
      res.status(301).send("No Report Found");
    }
    res.status(201).json({ reports });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createReport,
  getAllReportsByPatientId,
  getReportsByStatus,
};
