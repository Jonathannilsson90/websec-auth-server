const express = require('express')
const cors = require('cors')
const app = express()
const session = require('express-session')

const MongoStore = require('connect-mongo')
const rateLimit = require('./middleware/rateLimiter')
const passport = require('passport')



const initializePassport = require('./auth/passportConfig')
initializePassport(passport)


app.use(express.json())
app.use(cors())

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: process.env.DB_URL}),
    cookie:{
        maxAge: 1000 * 60 * 60 * 24
    }
}))
app.use(passport.initialize())
app.use(passport.session())

app.set('trust proxy', true)

app.get('/api', cors(), rateLimit, function (req,res) {
    if(!req.session.views) {
        req.session.views = 1;
    }

    const sessionId = req.sessionID
    const views = req.session.views++
    res.json({message: "Hello World!", sessionId, views})
})



const userRoutes = require('./routes/userRoutes')

app.use("/api", cors(), userRoutes)

module.exports = app;