const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const doctorSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

doctorSchema.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
