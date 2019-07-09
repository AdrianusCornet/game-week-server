const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define(
  'user',
  {
    name: {
      type: Sequelize.STRING,
      field: 'name'
    },
    hashed_password: {
      type: Sequelize.STRING,
      field: 'password'
    },
    players: {
      type: Sequelize.INTEGER,
      field: 'players'
    }
  },

  { tableName: 'users' }
);

module.exports = User;
