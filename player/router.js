const { Router } = require('express');

const Player = require('./model');
const Room = require('../room/model');
const User = require('../user/model');
const Cards = require('../cards/model');
const auth = require('../auth')

const playersCards = require('../GameLogic');
const router = new Router();

//endpoint to create a player
router.post('/player', auth, (request, response, next) => {
  if (!request.user.id || !request.body.room) {
    // u ft up
    return response.status(400).send({
      message: 'i need more data'
    })
  }
  const player = {
    userId: request.user.id,
    roomId: request.body.room,
  }
  return Player
    .create(player, { include: [Room] })
    .then(player => response.status(200).send(player))
    .catch(error => next(error));
});

//Endpoint to get all players including the rooms number they are in
router.get('/player', (request, response, next) => {
  return Player
    .findAll({ include: [Cards] })
    .then(plr => response.send(plr))
    .catch(error => next(error))
});

//Endpoint to get a specific and the respective room the player is in
router.get('/player/:id', (request, response, next) => {
  const id = request.params.id;
  return Player
    .findByPk(id, { include: [Cards] })
    .then(player => {
      response.send(player);
    });
});

module.exports = router;