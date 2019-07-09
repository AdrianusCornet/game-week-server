const express = require('express');
const { Router } = require('express');
const Player = require('./model');

const router = new Router();

//Show all players
router.get('/player', (request, response, next) =>
  Player.findAll()
    .then(plr => response.send(plr))
    .catch(error => next(error))
);

module.exports = router;
