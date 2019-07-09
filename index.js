// imports
// -npm
const express = require('express');
const bodyParser = require('body-parser');

const authRouter = require('./auth/router')
const JWT = require('./auth/jwt')
const UsersRouter = require('./user/router');
const PlayersRouter = require('./player/router');
const RoomsRouter = require('./room/router');
// init proceses
const app = express();

// Read request JSON bodies
const jsonParser = bodyParser.json();

// port
const port = process.env.PORT || 4000;

app.use(jsonParser);
app.use(authRouter)

app.use(UsersRouter);
app.use(PlayersRouter);
app.use(RoomsRouter);


app.listen(port, console.log(`Listening on port: ${port}`));

app.get('/ping', (request, response, next) => {
  console.log('ping pong');
  return response.send('pong');
});
