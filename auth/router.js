const { Router } = require('express')

const {toJWT} = require('./jwt')
const {toData} = require('./jwt')
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

router.get('/secret-endpoint', (request, response) => {
    const auth =request.headers.authorization && request.headers.authorization.split(' ')
    if (auth && auth[0] === 'Bearer' && auth[1]) {
        try{
            const data = toData(auth[1])
        response.send({
            message: 'Thank you for visiting the secret endpoint.',
            data
        })
    }
        catch(error){
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