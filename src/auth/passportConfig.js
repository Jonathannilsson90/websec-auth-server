// import LocalStrategy to use with username password
// import googleStrategy to use with googleId 
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/UserModel')



function initialize(passport) {
  const authenticateUser = async (username, password, done) => {
    try {
      // Find the user in the MongoDB database based on the username
      const user = await User.findOne({ username });

      if (user == null) {
        return done(null, false, { message: 'No user with that username' });
      }

      // Compare the provided password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password incorrect!' });
      }
    } catch (error) {
      return done(error);
    }
  }
// infering password and username since its the models default behavior
// no need to specify usernameField and passwordField

  passport.use(new LocalStrategy({ usernameField: 'username', passwordField: 'password'}, authenticateUser));
  passport.serializeUser((user, done) => {
    done(null, user.id); // Serialize the user's ID
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id); // Deserialize the user based on the ID
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
}

module.exports = initialize;
