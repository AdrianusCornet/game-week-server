const { Router } = require('express');
const Room = require('./model');

const router = new Router();

//Show all users
router.get('/room', (request, response, next) =>
  Room.findAll()
    .then(rm => response.send(rm))
    .catch(error => next(error))
);

module.exports = router;
