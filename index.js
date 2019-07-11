// imports
// -npm
const express = require('express');
//const Sse = require('json-sse');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRouter = require('./auth/router');
const JWT = require('./auth/jwt');
const UsersRouter = require('./user/router');
const PlayersRouter = require('./player/router');
const RoomsRouter = require('./room/router');
const CardsRouter = require('./cards/router');
// init proceses
const app = express();

// Register middleware
// Allow cross-origin resource sharing
app.use(cors());

// Read request JSON bodies
const jsonParser = bodyParser.json();

// port
const port = process.env.PORT || 4000;

app.use(jsonParser);
app.use(authRouter);

app.use(UsersRouter);
app.use(PlayersRouter);
app.use(RoomsRouter);
app.use(CardsRouter);

// const users = [];
// // Serialize the data
// const json = JSON.stringify(users);
// //console.log('JSOn from index', json);

// // Initialize the event source
// const stream = new Sse(json);

app.listen(port, console.log(`Listening on port: ${port}`));

app.get('/ping', (request, response, next) => {
  console.log('ping pong');
  return response.send('pong');
});
