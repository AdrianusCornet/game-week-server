const Sequelize = require('sequelize')
const db = require('../db')

const Cards = db.define(
    'card',
    {
      weight: {
        type: Sequelize.INTEGER,
        field: 'weight'
      },
      value: {
        type: Sequelize.STRING,
        field: 'values'
      }
    },
  
    { tableName: 'cards' }
  );

  module.exports = Cards