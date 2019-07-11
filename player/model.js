const Sequelize = require('sequelize');
const db = require('../db');
const Cards = require('../cards/model')
const Room = require('../room/model')
const User = require('../user/model')

const Player = db.define(
  'player',
  {
    // user: {
    //   type: Sequelize.STRING,
    //   field: 'user'
    // },
    // room: {
    //   type: Sequelize.STRING,
    //   field: 'room'
    // }
  },

  { tableName: 'players' }
);

// User.belongsTo(Player)

Player.belongsTo(Room)
Room.hasMany(Player)
Cards.belongsTo(Player)



module.exports = Player;
