import express from "express"
import cors from "cors"
import { host, port, frontend_url } from "./config/server.config.js"
import { userRouter } from "./routes/user.route.js"
import { authRouter } from "./routes/auth.route.js"
import { checkOwnerRouteJwt, checkRouteJwt } from "./middlewares/auth.middleware.js"
import { handicapRouter } from "./routes/handicap.route.js"
import { etablissementRouter } from "./routes/etablissement.route.js"
import { ownerRouter } from "./routes/owner.route.js"
import { rateLimit } from 'express-rate-limit'

const app = express()

//plugin
app.use(rateLimit({
	windowMs: 60 * 1000, 
	limit: 100,
	standardHeaders: 'draft-8',
}))
app.use(cors({
    origin: [`http://${host}:${port}`, frontend_url],
    credentials: true
}))
app.use(express.json())
//route
app.use('/auth', authRouter)
app.use('/user', checkRouteJwt, userRouter)
app.use('/handicap', checkRouteJwt, handicapRouter)
app.use('/etablissement', checkRouteJwt, etablissementRouter)
app.use('/owner', checkOwnerRouteJwt, ownerRouter)

app.use((req, res, next) => {
    return res.status(404).send({ "message": "page not found" })
})

export{ app }