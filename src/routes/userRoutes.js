const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken')


const controllers = require("../controllers/userControllers");
const passport = require("passport");

router.post("/register", controllers.registerUser);

router.post("/login", passport.authenticate("local"), (req, res) => {
const token = jwt.sign({userId: req.user.id }, process.env.JWTKEY, {expiresIn: '1h'});
res.send({token})
});

router.get('/check-session', (req, res) => {
    if (req.isAuthenticated()) {
   
      res.status(200).json({ isAuthenticated: true, user: req.user });
    } else {

      res.status(401).json({ isAuthenticated: false });
    }
  });

router.get('/logout', (req,res)=> {
    req.logout()
})


module.exports = router;
