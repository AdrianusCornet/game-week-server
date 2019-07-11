const { Router } = require('express');
const Player = require('./model');
const Room = require('../room/model');
const User = require('../user/model');
const Cards = require('../cards/model');

const playersCards = require('../GameLogic');
const router = new Router();

//endpoint to create a player
router.post('/player', (request, response, next) => {
  Player.create(request.body, { include: [Room] })
    .then(player => response.status(200).send(player))
    .catch(error => next(error));
});

//Endpoint to get all players including the rooms number they are in
router.get('/player', (request, response, next) =>
  Player.findAll({ include: [Cards] })

    .then(plr => response.send(plr))
    .catch(error => next(error))
);

//Endpoint to get a specific and the respective room the player is in
router.get('/player/:id', (request, response, next) => {
  const id = request.params.id;
  Player.findByPk(id, { include: [Cards] }).then(player => {
    response.send(player);
  });
});

module.exports = router;
