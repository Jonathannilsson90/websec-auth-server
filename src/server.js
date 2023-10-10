const express = require('express')
const port = process.env.PORT || 3000
const app = express()

app.get('/api', function (req,res) {
    res.json({message: "Hello World!"})
})

app.listen(port, () => console.log("Server started on port " + port))