import { getAllEtablissements, getEtablissementWithAllJoin } from '../controllers/etablissement.controller.js'

import { Router } from 'express'
const etablissementRouter = Router()

etablissementRouter.get("/", getAllEtablissements)
etablissementRouter.get("/findwithjoin", getEtablissementWithAllJoin)

export {
    etablissementRouter
}