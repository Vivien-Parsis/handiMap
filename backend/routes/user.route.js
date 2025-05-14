import { getCurrentUser, addHandicapToUser, deleteHandicapFromUser, getUserHandicap, getUserAvis } from '../controllers/user.controller.js'

import { Router } from 'express'
const userRouter = Router()

userRouter.get("/", getCurrentUser)

userRouter.get("/handicaps", getUserHandicap)
userRouter.post("/handicaps", addHandicapToUser)
userRouter.delete("/handicaps", deleteHandicapFromUser)

userRouter.get("/avis", getUserAvis)
userRouter.delete("/avis", deleteAvisFromUser)

export{
    userRouter
}