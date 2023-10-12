const express = require('express')
const router = express.Router()

const controllers = require('../controllers/userControllers')

router.post("/register", controllers.registerUser)

module.exports = router;