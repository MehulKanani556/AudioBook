require('dotenv').config()
const express = require('express')
const { connectDB } = require('./db/db')
const indexRoutes = require('./routes/indexRoutes')
const server = express()
const port = process.env.PORT || 4000

server.use(express.json())
server.use('/api', indexRoutes)

server.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`)
})