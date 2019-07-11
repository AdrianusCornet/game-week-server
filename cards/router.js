const { Router } = require("express");
const Cards = require("./model");
const Player = require('../player/model')
const router = new Router();

router.get("/card", (request, response, next) =>
  Cards.findAll()
    .then(cards => response.send(cards))
    .catch(error => next(error))
);

router.post("/card", (request, response, next) => {
  const values = ["2","3","4", "5", "6", "7", "8", "9", "10", "A", "J","Q","K" ];

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

  const randomCard = cards[Math.floor(Math.random() * cards.length)]
  Cards.create(randomCard, {include: Player})
  console.log("IS THIS MA RANDOM MCAD", randomCard)
  
  // cards.forEach(card => {
  //    Cards.create(card)
  // })
  // .then(cards => {
  //    console.log(cards[Math.floor(Math.random() * cards.length)]);
  // })  
});




module.exports = router;
