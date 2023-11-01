require("dotenv").config();
const express = require("express");
const axios = require('axios')
const jwt = require('jsonwebtoken')
const passport = require("passport");

const router = express.Router();

const controllers = require("../controllers/userControllers");

const RECAPTCHA_URL= process.env.RECAPTCHA_URL;


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
 //async?
  router.delete('/logout', (req, res) => {
    req.session.destroy((err) => {
      res.clearCookie('connect.sid');
      res.send('Logged out');
    });
  });

router.post('/verify', async(req,res) => {
  const {recaptchaValue} = req.body;
  const {data} = await axios.post( RECAPTCHA_URL+`${recaptchaValue}`
  );
  res.send(data);
})

module.exports = router;
