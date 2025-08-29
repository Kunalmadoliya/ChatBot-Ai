const express = require("express")
const connectToDb = require("./db/db")
var cors = require('cors')


connectToDb()


const app = express()
app.use(cors())


module.exports = app