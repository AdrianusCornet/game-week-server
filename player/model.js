const Sequelize = require('sequelize');
const db = require('../db');
const Cards = require('../cards/model')
const Room = require('../room/model')
const User = require('../user/model')

const Player = db.define(
  'player',
  {
    
  },

  { tableName: 'players' }
);

Player.belongsTo(User)
User.hasMany(Player)
Player.belongsTo(Room)
Room.hasMany(Player)
Cards.belongsTo(Player)
Player.hasMany(Cards)

module.exports = Player;
