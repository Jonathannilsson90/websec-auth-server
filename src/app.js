const express = require('express')
const cors = require('cors')
const app = express()

const rateLimit = require('./middleware/rateLimiter')

app.use(express.json())
app.use(cors())

app.set('trust proxy', false)
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);

app.get('/api', cors(), rateLimit,  function (req,res) {
    res.json({message: "Hello World!"})
})



const userRoutes = require('./routes/userRoutes')

app.use("/api", cors(), userRoutes)

module.exports = app;