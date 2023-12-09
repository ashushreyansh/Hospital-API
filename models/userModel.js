const mongoose = require("mongoose");
const bcrpyt = require("bcrpyt");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

userSchema.methods.verifyPassword = async (password) => {
  try {
    return await bcrpyt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

const user = mongoose.model("user", userSchema);

module.exports = user;
