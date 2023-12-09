const passport = require("passport");
const local = require("passport-local").Strategy;
const User = require("../models/userModel");
const bcrypt = require("bcrpyt");

passport.use(
  new local(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user || !(await user.verifyPassword(password))) {
          return done(null, false, { message: "Invalid Email or Password" });
        } else {
          return done(null, user);
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
  User.findById(id)
    .exec()
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});

module.exports = passport;
