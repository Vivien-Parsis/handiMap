import { getCurrentUser, addHandicapToUser, deleteHandicapFromUser } from '../controllers/user.controller.js'

import { Router } from 'express'
const userRouter = Router()

userRouter.get("/", getCurrentUser)
userRouter.post("/handicaps", addHandicapToUser)
userRouter.delete("/handicaps", deleteHandicapFromUser)

export{
    userRouter
}