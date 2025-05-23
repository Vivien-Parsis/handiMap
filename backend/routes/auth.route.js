import { login, register } from "../controllers/auth.controller.js"
import { Router } from "express"
const authRouter = Router()

authRouter.post("/login", login)
authRouter.post("/register", register)

export{
    authRouter
}