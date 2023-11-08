require("dotenv").config();
const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const router = express.Router();

const controllers = require("../controllers/userControllers");

const RECAPTCHA_URL = process.env.RECAPTCHA_URL;

router.post("/register", controllers.registerUser);

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).send({ message: "Login successful" });
});

router.get("/token", (req,res)=>{
  const newJWTCookieToken = jwt.sign({userId:req.user.id}, process.env.JWTKEY,{
    expiresIn: "2m",
  });
  res.cookie("__session",newJWTCookieToken,{
    httpOnly: true,
    secure: true,
    sameSite: sameSite,
    maxAge: 1000 * 60 * 2,
    path: "/",
  });

  res.status(200).json({token: newJWTCookieToken})
})


const sameSite = process.env.SAMESITE 

router.get('/refresh-token', (req,res)=>{
  const refreshJWTCookieToken =  req.cookies.__session;

  jwt.verify(refreshJWTCookieToken, process.env.JWTKEY, (err, decoded)=>{
    if(err){
      return res.status(401).json({message: 'invalid jwtToken'})
  }
  const newJWTCookieToken = jwt.sign({userId: decoded.userId}, process.env.JWTKEY,{
    expiresIn: '2m'
  })
  res.cookie("__session",newJWTCookieToken,{
    httpOnly: true,
    secure: true,
    sameSite: sameSite,
    maxAge: 1000 * 60 * 2,
    path: "/",
  });

  res.json({token: newJWTCookieToken})
  })
  
})

router.get("/check-session", (req, res) => {
  if (req.isAuthenticated()) {

    res.status(200).json({ isAuthenticated: true, user: req.user });
  } else {
    res.status(401).json({ isAuthenticated: false });
  }
});

router.delete("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.clearCookie("connect.sid");
    res.clearCookie("__session");
    res.send("Logged out");
  });
});

router.post("/verify", async (req, res) => {
  const { recaptchaValue } = req.body;
  const { data } = await axios.post(RECAPTCHA_URL + `${recaptchaValue}`);
  res.send(data);
});

module.exports = router;
