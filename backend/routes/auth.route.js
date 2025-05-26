import { login, register } from "../controllers/auth.controller.js"
import { Router } from "express"
import { rateLimit } from "../middlewares/rateLimiter.middleware.js"
const authRouter = Router()

authRouter.post("/login", login, rateLimit)
authRouter.post("/register", register, rateLimit)

export{
    authRouter
}