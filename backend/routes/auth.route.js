import { login, register } from "../controllers/auth.controller.js"
import { Router } from "express"
import { rateLimiter } from "../middlewares/rateLimiter.middleware.js"
const authRouter = Router()

authRouter.post("/login", login, rateLimiter)
authRouter.post("/register", register, rateLimiter)

export{
    authRouter
}