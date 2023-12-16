const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema({
  doctor: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
  patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
  patientName: { type: String, required: true },
  patientPhoneNumber: { type: String, required: true },
  category:{type: String},
  status: {
    type: String,
    enum: [
      "Negative",
      "Travelled-Quarantine",
      "Symptoms-Quarantine",
      "Positive-Admit",
    ],
    required: true,
  },
  date: { type: Date, default: Date.now },
  // Add more fields as needed
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
