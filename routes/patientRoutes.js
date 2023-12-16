const express = require("express");
const patientController = require("../controller/patientController");
const reportController = require("../controller/reportController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/register", authMiddleware, (req, res) => {
  res.render("patientRegister");
});
router.post("/register", authMiddleware, patientController.register);
router.get(
  "/:id",
  authMiddleware,
  patientController.getPatientById,
  (req, res) => {
    res.render("patientProfile", { patient: req.patient });
  }
);
router.get(
  "/:id/create_report",
  authMiddleware,
  patientController.getPatientById,
  (req, res) => {
    const patient = req.patient;
    const doctorEmail = req.user.email;
    if (!patient) {
      return res.status(404).json({ error: "Patient not found1" });
    }

    res.render("createReport", { patient, doctorEmail });
  }
);

router.post(
  "/:id/create_report",
  authMiddleware,
  patientController.getPatientById,
  reportController.createReport
);

router.get(
  "/:id/all_reports",
  authMiddleware,
  patientController.getPatientById,
  reportController.getAllReportsByPatientId
);

module.exports = router;
