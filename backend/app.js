import express from "express"
import cors from "cors"
import { host, port, frontend_url, node_env } from "./config/server.config.js"
import morgan from "morgan"
import helmet from "helmet"
import { apiRouter } from "./routes/index.js"
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger.config.js'

const app = express()

//middleware
app.use(helmet())

app.use(cors({
    origin: [`http://${host}:${port}`, frontend_url],
    credentials: true
}))
app.use(express.json())
if (node_env == "development" || node_env == "test") {
    app.use(morgan('HTTP :http-version || status code :status || method :method || :date[web] || response time :response-time ms || url :url || :user-agent'))
}
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

//route
app.use('/api/v1', apiRouter)

app.use((req, res, next) => {
    return res.status(404).send({ "message": "page not found" })
})

export { app }