const { login, register } = require('../controllers/auth.controller')

const authRouter = require('express').Router()

authRouter.post("/login", login)
authRouter.post("/register", register)

module.exports = {
    authRouter
}