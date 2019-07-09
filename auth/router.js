const { Router } = require('express')

const { toJWT } = require('./jwt')
const { toData } = require('./jwt')
const bcrypt = require ('bcryptjs')
const User = require('../user/model')
const router = new Router()

const noCred = "Missing credentials, please provide username and password"
const invalidCred = "Invalid credentials, please provide correct username and password"

// endpoints

router.post('/login', (request, response, next) => {
    const username = request.body.name
    const password = request.body.password

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
                console.log('ENTETY ==>', entity)
                if (!entity) {
                    console.log('NO ENTERY')
                    response.status(400).send({
                        message: invalidCred
                    })
                }
                else if (bcrypt.compareSync(password, entity.password)) {
                    response.send({
                        jwt: toJWT({ userId: entity.id })
                    })
                }
                else {
                    response.status(400).send({
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
}
)

router.get('/secret-endpoint', (request, response) => {
    const auth = request.headers.authorization && request.headers.authorization.split(' ')
    if (auth && auth[0] === 'Bearer' && auth[1]) {
        try {
            const data = toData(auth[1])
            response.send({
                message: 'Thank you for visiting the secret endpoint.',
                data
            })
        }
        catch (error) {
            response.status(400).send({
                message: `Error ${error.name}: ${error.message}`
            })
        }
    } else {
        response.status(401).send({
            message: 'Please suply some valid credentials'
        })
    }
})



module.exports = router