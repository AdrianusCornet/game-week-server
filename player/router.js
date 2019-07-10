const express = require("express");
const { Router } = require("express");
const Player = require("./model");

const playersCards = require('../GameLogic')

const router = new Router();

//Show all players
router.get("/player", (request, response, next) =>
  Player.findAll()
    .then(plr => response.send(plr))
    .catch(error => next(error))
);

router.post("/player", (request, response, next) => {
  console.log('TEST', playersCards())

  const player = {
    user: request.body.user,
    room: request.body.room,
    cards: playersCards()
  };
  console.log("PLAYER IS ", player)
  Player.create(player).then(player => response.send(player));
});




module.exports = router;

