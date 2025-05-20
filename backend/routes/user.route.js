import { 
    getCurrentUser, 
    addHandicapToUser, 
    deleteHandicapFromUser, 
    getUserHandicap, 
    getUserAvis, 
    deleteAvisFromUser 
} from '../controllers/user.controller.js'

import { Router } from 'express'
import { checkRouteJwt } from '../middlewares/auth.middleware.js'
const userRouter = Router()

userRouter.get("/", checkRouteJwt, getCurrentUser)

userRouter.get("/handicaps", checkRouteJwt, getUserHandicap)
userRouter.post("/handicaps", checkRouteJwt, addHandicapToUser)
userRouter.delete("/handicaps", checkRouteJwt, deleteHandicapFromUser)

userRouter.get("/avis", checkRouteJwt, getUserAvis)
userRouter.delete("/avis", checkRouteJwt, deleteAvisFromUser)

export{
    userRouter
}