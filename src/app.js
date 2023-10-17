const express = require('express')
const cors = require('cors')
const app = express()
const session = require('express-session')

const MongoStore = require('connect-mongo')
const rateLimit = require('./middleware/rateLimiter')


app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: process.env.DB_URL + 'sessions'}),
    cookie:{
        maxAge: 1000 * 60 * 60 * 24
    }

}))

app.use(express.json())
app.use(cors())

app.set('trust proxy', true)

app.get('/api', cors(), rateLimit,  function (req,res) {
    res.json({message: "Hello World!"})
})



const userRoutes = require('./routes/userRoutes')

app.use("/api", cors(), userRoutes)

module.exports = app;