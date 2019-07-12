const { Router } = require("express");

const Cards = require("./model");
const auth = require('../auth')
const Player = require("../player/model");
const { cards } = require('../GameLogic')

const router = new Router();

// return all carts in db
router.get("/card", (request, response, next) => {
  return Cards.findAll()
    .then(cards => response.send(cards))
    .catch(error => next(error))
});
// create new card
router.post("/hit-card", auth, async (request, response, next) => {
  if (!request.body.playerId || !request.user.id) {
    return response.status(400).send({
      message: 'missing data'
    })
  }
  function userHasThisPlayer() {
    const value = Player
      .findByPk(id = request.body.playerId)
      .then(player => {
        if (!player) {
          return false
        }
        return player.userId === request.user.id
      })

    return value
  }
  if (!await userHasThisPlayer()) {
    return response.status(404).send({
      message: 'cant find this player'
    })
  }

  const randomCard = cards[Math.floor(Math.random() * cards.length)];
  const card = {
    value: randomCard.value,
    weight: randomCard.weight,
    playerId: request.body.playerId
  }
  return Cards
    .create(card)
    .then(card => {
      response.send(card)
    })
    .catch(error => next(error));
});

module.exports = router;