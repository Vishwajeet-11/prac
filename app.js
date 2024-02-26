const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const morgan = require("morgan")
const errorHandling = require("./api/middlewares/errorHandling")

const contactRoutes = require("./api/routes/contactRoutes")
const userRoutes = require("./api/routes/userRoutes")


app.use(morgan("dev"))
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

app.use("/", contactRoutes)
app.use("/", userRoutes)

// error handling 
app.use(errorHandling)

module.exports = app
