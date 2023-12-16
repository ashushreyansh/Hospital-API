const express = require("express");
const router = express.Router();
const reportController = require("../controller/reportController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/:status", authMiddleware, reportController.getReportsByStatus);

module.exports = router;
