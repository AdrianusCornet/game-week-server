const { Router } = require('express');
const User = require('./model');
const bcrypt = require('bcryptjs')

const router = new Router();

//Show all users
router.get('/users', (request, response, next) =>
  User.findAll()
    .then(usr => response.send(usr))
    .catch(error => next(error))
);

router.post('/users', (request, response, next) =>{
  const user = {
    name: request.body.name,
    password: bcrypt.hashSync(request.body.password, 10)
  }
  User.create(user)
  .then(user => {
    response.status(201).json({
      message: "A new user was added",
      "new user": user
    })
  })
  .catch(error => next(error))
})



module.exports = router;
