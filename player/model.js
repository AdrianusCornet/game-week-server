const Sequelize = require('sequelize');
const db = require('../db');

const Player = db.define(
  'player',
  {
    user: {
      type: Sequelize.STRING,
      field: 'user'
    },
    room: {
      type: Sequelize.STRING,
      field: 'room'
    },
    cards: {
      type: Sequelize.JSON,
      field: 'cards'
    }
  },

  { tableName: 'players' }
);

module.exports = Player;
