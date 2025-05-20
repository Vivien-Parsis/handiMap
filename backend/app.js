import express from "express"
import cors from "cors"
import { host, port, frontend_url } from "./config/server.config.js"
import { userRouter } from "./routes/user.route.js"
import { authRouter } from "./routes/auth.route.js"
import { handicapRouter } from "./routes/handicap.route.js"
import { etablissementRouter } from "./routes/etablissement.route.js"
import { ownerRouter } from "./routes/owner.route.js"
import { rateLimit } from 'express-rate-limit'
import morgan from "morgan"
import helmet from 'helmet'

const app = express()

//middleware
app.use(helmet())
app.use(rateLimit({
    windowMs: 60 * 1000,
    limit: 100,
}))
app.use(cors({
    origin: [`http://${host}:${port}`, frontend_url],
    credentials: true
}))
app.use(express.json())
app.use(morgan(':status || :method :date[clf] || :response-time || :url || :user-agent'))
//route
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/handicap', handicapRouter)
app.use('/etablissement', etablissementRouter)
app.use('/owner', ownerRouter)

app.use((req, res, next) => {
    return res.status(404).send({ "message": "page not found" })
})

export { app }