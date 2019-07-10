//create deck
const suites = ["hearts", "spades", "clubs", "diamonds"]

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

console.log("LOGINING ", PlayerCards())

function drawCard() {
  return cards[Math.floor(Math.random() * cards.length)];
}

 function PlayerCards() {
  return [(drawCard()), (drawCard())];
}

function houseCards() {
  return [drawCard(), drawCard()];
}

function startGame2() {
  return {
    houseC: houseCards(),
    playC: PlayerCards()
  };
}

console.log("PlayersCards", PlayerCards());

module.exports = PlayerCards