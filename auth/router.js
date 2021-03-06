const { Router } = require('express')
const bcrypt = require('bcryptjs')

const { toJWT, toData } = require('./jwt')
const User = require('../user/model')
const auth = require('./')

const router = new Router()

const noCred = "Missing credentials, please provide username and password"
const invalidCred = "Invalid credentials, please provide correct username and password"

// endpoints

router.post('/login', (request, response, next) => {
    const { username, password } = request.body

    if (!username || !password) {
        return response.status(400).send({
            message: noCred
        })
    } else {
        User
            .findOne({
                where: {
                    name: username
                }
            })
            .then(entity => {
                if (!entity) {
                    response.status(404).send({
                        message: invalidCred
                    })
                }
                else if (bcrypt.compareSync(password, entity.password)) {
                    response.send({
                        jwt: toJWT({ userId: entity.id }),
                        user:{
                            id: entity.id,
                            name: entity.name
                        }
                    })
                }
                else {
                    response.status(404).send({
                        message: invalidCred
                    })
                }
            })
            .catch(error => {
                console.error(error)
                response.status(500).send({
                    message: "internal server error"
                })
            })
    }
})

module.exports = router