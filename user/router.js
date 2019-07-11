const { Router } = require('express');
const bcrypt = require('bcryptjs');

const User = require('./model');

const router = new Router();

//Show all users
router.get('/users', (request, response, next) =>
  User.findAll()
    .then(usr => response.send(usr))
    .catch(error => next(error))
);

router.post('/users', (request, response, next) => {
  if (!request.body.username || !request.body.password ) {
    return response.status(400).send({
      message: 'I cant read that'
    })
  }
  const user = {
    name: request.body.username,
    password: bcrypt.hashSync(request.body.password, 10)
  };
  User.create(user)
    .then(user => {
      response.status(201).json({
        message: 'A new user was added',
        'new user': user
      });
    })
    .catch(error => next(error));
});

module.exports = router;
