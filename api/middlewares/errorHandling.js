const express = require("express")
const app = express()

app.use((req, res, next) => {
    const error = new Error("not found")
    error.status = 404
    next()
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message : error.message
        }
    })
})

module.exports = app