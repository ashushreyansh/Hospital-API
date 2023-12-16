const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Doctor = require("../models/doctorModel");
const bcrypt = require("bcrypt");

passport.use(
  "doctor-local",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const doctor = await Doctor.findOne({ email });
        if (!doctor || !(await bcrypt.compare(password, doctor.password))) {
          return done(null, false, { message: "Invalid Email or Password" });
        } else {
          return done(null, doctor);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Doctor.findById(id)
    .exec()
    .then((doctor) => {
      done(null, doctor);
    })
    .catch((err) => {
      done(err, null);
    });
});

module.exports = passport;
