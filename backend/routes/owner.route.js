import {
    addHandicapToEtablissement,
    createEtablissement,
    deleteHandicapToEtablissement,
    getAllOwnerEtablissement,
    updateEtablissement,
    deleteEtablissement
} from '../controllers/owner.controller.js'
import { Router } from 'express'
import { upload } from '../middlewares/upload.middleware.js'

const ownerRouter = Router()

ownerRouter.get("/etablissements", getAllOwnerEtablissement)
ownerRouter.post("/etablissements", upload.single('photo'), createEtablissement)
ownerRouter.put("/etablissements", updateEtablissement)
ownerRouter.delete("/etablissements", deleteEtablissement)

ownerRouter.post("/etablissements/handicaps", addHandicapToEtablissement)
ownerRouter.delete("/etablissements/handicaps", deleteHandicapToEtablissement)

export {
    ownerRouter
}