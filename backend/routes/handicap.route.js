const { getAllHandicaps } = require('../controllers/handicap.controller')

const handicapRouter = require('express').Router()

handicapRouter.get("/",getAllHandicaps)

module.exports = {
    handicapRouter
}