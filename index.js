const path = require('path')
const crypto = require('crypto')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// ##############################################
// Statics and setup

const PORT = process.env.PORT || 8080
const CLIENT_PATH = path.resolve(__dirname, './client')

// Use webpack hot module reloading
require('./webpack_hmr')(app)

// Use application/json body parser
app.use(bodyParser.json())

// Serve static (client app)
app.use(express.static(CLIENT_PATH))

// ##############################################
// Basic CRUD endpoints, collection

// Our "datasource"
let collection = []

// Find records
const findRecord = (id) => collection.filter((i) => i.id === id)[0] || false

// Create
app.post('/items', (req, res) => {
  // Push into collection with random id
  const newFoo = Object.assign({ id: crypto.randomBytes(20).toString('hex') }, req.body)
  collection.push(newFoo)
  res.status(201).send(newFoo)
})

// Read
app.get('/items/:id?', (req, res) => {
  if (req.params.id) {
    // Find a specific record (id param supplied)
    const record = findRecord(req.params.id)
    if (record) return res.status(200).send(record)
    // No record found
    return res.status(404).send('Not found')
  }
  // Send all records
  res.status(200).send(collection)
})

// Update
app.put('/items/:id', (req, res) => {
  const record = findRecord(req.params.id)
  // No record found
  if (!record) return res.status(404).send('No found')
  // Update record
  const updatedRecord = Object.assign(record, req.body)
  collection = collection.map((i) => {
    // Update matching record
    if (i === req.params.id) return updatedRecord
    return i
  })
  res.status(200).send(updatedRecord)
})

// Delete
app.delete('/items/:id', (req, res) => {
  collection = collection.filter((i) => i.id !== req.params.id)
  res.status(200).send('Ok')
})

// ##############################################
// Listening...

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`)
})