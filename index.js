const http = require('http')
const fs = require('fs')
const express = require('express')
const config = require('./config')
const { join } = require('path')

console.log(config)

const app = express()

// Load SSL certificates
const options = {
  key: fs.readFileSync('/etc/ssl/default.key'),
  cert: fs.readFileSync('/etc/ssl/default.crt'),
}


app.use(express.static(join(__dirname, 'public')))

// Create HTTPS server
http.createServer(options, app).listen(config.express.port, () => {
  console.log(`Server is running on https://localhost:${config.express.port}`)
})