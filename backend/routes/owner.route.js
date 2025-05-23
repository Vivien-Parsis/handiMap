import {
    addHandicapToEtablissement,
    createEtablissement,
    deleteHandicapToEtablissement,
    getAllOwnerEtablissement,
    updateEtablissement,
    deleteEtablissement,
    getAllAvisFromEtablissement,
    deleteAvisFromEtablissement
} from "../controllers/owner.controller.js" 
import { Router } from "express"
import { upload } from "../middlewares/upload.middleware.js"
import { checkOwnerRouteJwt } from "../middlewares/auth.middleware.js"

const ownerRouter = Router()

ownerRouter.get("/etablissements", checkOwnerRouteJwt, getAllOwnerEtablissement)
ownerRouter.post("/etablissements", checkOwnerRouteJwt, upload.single('photo'), createEtablissement)
ownerRouter.put("/etablissements", checkOwnerRouteJwt, upload.single('photo'), updateEtablissement)
ownerRouter.delete("/etablissements", checkOwnerRouteJwt, deleteEtablissement)

ownerRouter.post("/etablissements/handicaps", checkOwnerRouteJwt, addHandicapToEtablissement)
ownerRouter.delete("/etablissements/handicaps", checkOwnerRouteJwt, deleteHandicapToEtablissement)

ownerRouter.get("/etablissements/avis", checkOwnerRouteJwt, getAllAvisFromEtablissement)
ownerRouter.delete("/etablissements/avis", checkOwnerRouteJwt, deleteAvisFromEtablissement)

export {
    ownerRouter
}