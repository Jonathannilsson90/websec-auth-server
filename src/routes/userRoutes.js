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

module.exports = router;
