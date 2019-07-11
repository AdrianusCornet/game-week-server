const Sequelize = require('sequelize');
const db = require('../db');

const Room = db.define(
  'room',
  {
    name: {
      type: Sequelize.STRING,
      field: 'name'
    },
    // cards_house: {
    //   type: Sequelize.STRING,
    //   field: 'cards_house'
    // },
    // status: {
    //   type: Sequelize.STRING,
    //   field: 'status'
    // },
  },
  { tableName: 'rooms' }
);

module.exports = Room;
