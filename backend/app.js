import express from "express"
import cors from "cors"
import { host, port, frontend_url } from "./config/server.config.js"
import { rateLimit } from "express-rate-limit"
import morgan from "morgan"
import helmet from "helmet"
import { apiRouter } from "./routes/index.js"

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
app.use('/api/v1', apiRouter)

app.use((req, res, next) => {
    return res.status(404).send({ "message": "page not found" })
})

export { app }