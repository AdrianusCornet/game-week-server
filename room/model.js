const Sequelize = require('sequelize');
const db = require('../db');

const Room = db.define(
  'room',
  {
    cards_house: {
      type: Sequelize.STRING,
      field: 'cards_house'
    },
    status: {
      type: Sequelize.STRING,
      field: 'status'
    },
    players: {
      type: Sequelize.INTEGER,
      field: 'players'
    }
  },

  { tableName: 'rooms' }
);

module.exports = Room;
