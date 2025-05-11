const jwt = require('jsonwebtoken')
const { jwt_secret } = require('../config/server.config')

const generateToken = (user) => {
    return jwt.sign({ role: user.role, id_user: user.id_user, email: user.email }, jwt_secret, { expiresIn: "24h" })
}

module.exports = {
    generateToken
}