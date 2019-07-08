// imports
// -npm
const express = require('express')

// init proceses
const app = express()

// port
const port = process.env.PORT || 4000

app.listen(port, console.log(`Listening on port: ${port}`))

app.get(
  '/pign',
  (request, response, next) => {
    console.log('ping pong')
    return response.send('pong')
  }
)
