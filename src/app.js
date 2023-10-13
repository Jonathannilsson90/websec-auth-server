const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())


app.get('/api', cors(),  function (req,res) {
    res.json({message: "Hello World! update utan auto trigger! D:"})
})



const userRoutes = require('./routes/userRoutes')
app.use("/api", cors(), userRoutes)

module.exports = app;