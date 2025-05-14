import { addHandicapToEtablissement, deleteHandicapToEtablissement, getAllOwnerEtablissement } from '../controllers/owner.controller.js'
import { Router } from 'express'
const ownerRouter = Router()

ownerRouter.get("/etablissements", getAllOwnerEtablissement)
ownerRouter.post("/etablissements/handicaps", addHandicapToEtablissement)
ownerRouter.delete("/etablissements/handicaps", deleteHandicapToEtablissement)

export{
    ownerRouter
}