import {
    getCurrentUser,
    addHandicapToUser,
    deleteHandicapFromUser,
    getUserHandicap,
    getUserAvis,
    deleteAvisFromUser,
    createUserAvis
} from '../controllers/user.controller.js'

import { Router } from 'express'
import { checkRouteJwt } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/upload.middleware.js'
const userRouter = Router()

userRouter.get("/", checkRouteJwt, getCurrentUser)

userRouter.get("/handicaps", checkRouteJwt, getUserHandicap)
userRouter.post("/handicaps", checkRouteJwt, addHandicapToUser)
userRouter.delete("/handicaps", checkRouteJwt, deleteHandicapFromUser)

userRouter.get("/avis", checkRouteJwt, getUserAvis)
userRouter.post("/avis", checkRouteJwt, upload.single("photo"), createUserAvis)
userRouter.delete("/avis", checkRouteJwt, deleteAvisFromUser)

export {
    userRouter
}