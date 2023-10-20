const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const cors = require('cors')
const passport = require('passport')
const app = express()

const rateLimit = require('./middleware/rateLimiter')

const corsOptions = {
    origin: process.env.URL,
    credentials: true, 
  };

const initializePassport = require('./auth/passportConfig')
initializePassport(passport)

app.use(express.json())
app.use(cors(corsOptions))

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.DB_URL}),
    cookie:{
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: process.env.SAMESITE || 'lax',
        secure: process.env.COOKIE_SECURE || false,

    }
}))

app.use(passport.initialize())
app.use(passport.session())

app.set('trust proxy', true)


app.get('/api', cors(corsOptions), rateLimit, function (req,res) {
    
    res.json({message: "Hello World!"})
})

const userRoutes = require('./routes/userRoutes')
app.use("/api",cors(corsOptions), userRoutes)

module.exports = app;