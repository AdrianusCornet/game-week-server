const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define(
  'user',
  {
    name: {
      type: Sequelize.STRING,
      field: 'name',
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      field: 'password',
      allowNull: false
    }
  },

  { tableName: 'users' }
);

module.exports = User;
