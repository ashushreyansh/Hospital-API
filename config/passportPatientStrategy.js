const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Patient = require("../models/patientModel");

passport.use(
  "patient-local",
  new LocalStrategy(
    { usernameField: "phoneNumber", passwordField: "password" },
    async (phoneNumber, password, done) => {
      try {
        const patient = await Patient.findOne({ phoneNumber });
        
        if (!patient || !verifyPatientPassword(password, patient.password)) {
          return done(null, false, {
            message: "Invalid Phone Number or Password",
          });
        } else {
          return done(null, patient);
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
  Patient.findById(id)
    .exec()
    .then((patient) => {
      done(null, patient);
    })
    .catch((err) => {
      done(err, null);
    });
});

module.exports = passport;
