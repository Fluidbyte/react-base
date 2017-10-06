const path = require('path')
const express = require('express')
const app = express()

const PORT = process.env.PORT || 8080
const CLIENT_PATH = path.resolve(__dirname, './client')

require('./webpack_hmr')(app)

// Serve static (client app)
app.use(express.static(CLIENT_PATH))

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`)
})