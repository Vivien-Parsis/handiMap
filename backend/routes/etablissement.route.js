import { getAlletablissements } from '../controllers/etablissement.controller.js'

import { Router } from 'express'
const etablissementRouter = Router()

etablissementRouter.get("/",getAlletablissements)

export{
    etablissementRouter
}