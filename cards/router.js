const { Router } = require("express");
const Cards = require("./model");
const Player = require("../player/model");
const router = new Router();

router.get("/card", (request, response, next) =>
  Cards.findAll()
    .then(cards => response.send(cards))
    .catch(error => next(error))
);

const values = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "A",
  "J",
  "Q",
  "K"
];

const cards = values.map(value => {
  return { weight: assignWeight(value), value: value };

  function assignWeight(value) {
    switch (value) {
      case "J":
      case "Q":
      case "K":
        return 10;
      case "A":
        return 11;
      default:
        return parseInt(value);
    }
  }
});

router.post("/card", (request, response, next) => {
  const randomCard = cards[Math.floor(Math.random() * cards.length)];
  const card = {
    value: randomCard.value,
    weight: randomCard.weight,
    playerId: request.body.playerId
  }
  Cards.create(card).then(card => {
    response.send(card)
  });
  console.log("IS THIS MA RANDOM MCAD",);

  // cards.forEach(card => {
  //    Cards.create(card)
  // })
  // .then(cards => {
  //    console.log(cards[Math.floor(Math.random() * cards.length)]);
  // })
});

module.exports = router;
