const { getAlletablissements } = require('../controllers/etablissement.controller')

const etablissementRouter = require('express').Router()

etablissementRouter.get("/",getAlletablissements)

module.exports = {
    etablissementRouter
}