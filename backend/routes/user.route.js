const { getCurrentUser, addHandicapToUser, deleteHandicapFromUser } = require('../controllers/user.controller')

const userRouter = require('express').Router()

userRouter.get("/", getCurrentUser)
userRouter.post("/handicaps", addHandicapToUser)
userRouter.delete("/handicaps", deleteHandicapFromUser)

module.exports = {
    userRouter
}