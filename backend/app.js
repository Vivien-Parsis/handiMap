import express from "express"
import cors from "cors"
import { host, port, frontend_url, node_env } from "./config/server.config.js"
import morgan from "morgan"
import helmet from "helmet"
import { apiRouter } from "./routes/index.js"
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger.config.js'
import fs from 'fs'

const app = express()

//middleware
app.use(helmet())

app.use(cors({
    origin: [`http://${host}:${port}`, frontend_url],
    credentials: true
}))
app.use(express.json())

if (node_env == "DEV" || node_env == "TEST") {
    if (!fs.existsSync('./log')) {
        fs.mkdirSync('./log', { recursive: true });
    }
    const accessLogStream = fs.createWriteStream('./log/access.log', { flags: 'a' })
    app.use(morgan('HTTP :http-version || status code :status || method :method || :date[web] || response time :response-time ms || url :url || :user-agent'))
    app.use(morgan('HTTP :http-version || status code :status || method :method || :date[web] || response time :response-time ms || url :url || :user-agent', { stream: accessLogStream }))
}
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

//route
app.use('/api/v1', apiRouter)

app.use((req, res, next) => {
    return res.status(404).send({ "message": "page not found" })
})

export { app }