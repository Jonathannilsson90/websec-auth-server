require("dotenv").config()
app = require('./app')


const mongoose = require('mongoose')
const port = process.env.PORT || 3000



mongoose
.connect(process.env.DB_URL)
.then(() => {
    console.log("Mongoose connected! :)");
    app.listen(port, () => console.log("Server started on port " + port))
})
.catch(console.error)