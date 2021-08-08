// In order to use our Private keys we set up config.env file
require("dotenv").config({
	path: "./config.env",
})
require("./model-relation")
const express = require("express")
const process = require("process")
const app = express()
app.use(express.json())

app.use("/api/auth", require("./controllers/auth/auth"))

app.use((req, res, next) => {
	// We only allow the request from the server we are using
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
	res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS")
	next()
})

// To use controller

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
	console.log(`Server running on port http://localhost:${PORT}`)
})
