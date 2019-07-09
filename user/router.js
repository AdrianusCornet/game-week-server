const { Router } = require('express');
const User = require('./model');

const router = new Router();

//Show all users
router.get('/user', (request, response, next) =>
  User.findAll()
    .then(usr => response.send(usr))
    .catch(error => next(error))
);

module.exports = router;
