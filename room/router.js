const { Router } = require('express');

const Room = require('./model');
const Player = require('../player/model');
const Sse = require('json-sse');

const stream = new Sse();

const router = new Router();

//Endpoint to create a room with stream
router.get('/stream', (request, response, next) => {
  return stream.init(request, response);
});

router.post('/room', (request, response) => {
  const room = {
    name: request.body.name
  };
  return Room
    .create(room)
    .then(room => {
      const json = JSON.stringify(room);

      // Update the initial data
      stream.updateInit(json);

      // Notify all the clients
      stream.send(json);

      // Send a response
      return response.status(201).send(room);
    });
});

//Endpoint to show all the rooms - including the respective players in the room
router.get('/room', (request, response, next) => {
  return Room
    .findAll({ include: [Player] })
    .then(rm => response.send(rm))
    .catch(error => next(error))
});

//Endpoint to get a specific room (based on its id), including the players in that room
router.get('/room/:id', (request, response, next) => {
  const id = request.params.id;
  return Room
    .findByPk(id, { include: [Player] })
    .then(room => {
      response.status(200).send(room);
    })
    .catch(err => next(err));
});

module.exports = router;
