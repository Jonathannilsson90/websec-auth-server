require('dotenv').config();
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const passport = require("passport");
const app = express();
const cookieParser = require("cookie-parser");
const rateLimit = require("./middleware/rateLimiter");
const helmet = require("helmet");

const morgan = require('morgan')
const ecsFormat = require('@elastic/ecs-morgan-format')
const fs = require('fs')
const path = require('path')
const rfs = require('rotating-file-stream')
const healthcheck = require('healthcheck-middleware');
const logDirectory = path.join(__dirname,'../logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

const accessLogStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'),{
  interval: '1d',
  path: logDirectory
})

app.use(morgan(ecsFormat(),{stream: accessLogStream}))

app.use('/healthcheck',healthcheck())

const corsOptions = {
  origin: process.env.URL,
  credentials: true,
};

const initializePassport = require("./auth/passportConfig");
initializePassport(passport);

app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

const sameSite = process.env.SAMESITE

app.use(
  session({
    proxy: true,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      sameSite: sameSite,
      secure: "auto",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/api", cors(corsOptions), rateLimit, function (req, res) {
  res.json({ message: "Hello World!" });
});

const userRoutes = require("./routes/userRoutes");
app.use("/api", cors(corsOptions), userRoutes);

module.exports = app;
