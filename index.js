const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

mongoose.connect(process.env.MONGO_URL)
const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/todo", require("./routes/todo.routes"))
app.use("*", (req, res, err, next) => {
    res.status(400).json({ message: "Resource Not Found", error: err.message })
})
app.use((req, res, err, next) => {
    res.status(500).json({ message: "Server Error", error: err.message })
})
mongoose.connection.once("open", () => {
    console.log("MONGO CONNECTED")
    app.listen(process.env.PORT, console.log("SERVER RUNNING🏃‍♂️"))
})
