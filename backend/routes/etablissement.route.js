import { getAllEtablissements, getAllEtablissementWithAllJoin, getEtablissementWithAllJoin } from "../controllers/etablissement.controller.js"

import { Router } from "express"
const etablissementRouter = Router()

etablissementRouter.get("/", getAllEtablissements)
etablissementRouter.get("/with-relations", getEtablissementWithAllJoin)
etablissementRouter.get("/all-with-relations", getAllEtablissementWithAllJoin)

export {
    etablissementRouter
}