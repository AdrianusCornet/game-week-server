const { Router } = require('express')

const {toJWT} = require('./jwt')
const router = new Router()

// endpoints

router.post('/login', (request, response, next) => {
    const username = request.body.username
    const password = request.body.password

    if(!username || !password){
        return response.status(400).send({
            message: "Invalid credentials, please provide username and password"
        }) } else {
            response.send({
                jwt: toJWT({ userId: 1})
            })
        }
    }
)  



module.exports = router