import express from "express"
import { apiRouter } from "./routes/index.js"
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger.config.js'
import { consoleLogger, writtenLogger } from "./middlewares/logger.middleware.js"
import { helmetMiddleware } from "./middlewares/helmet.middleware.js"
import { corsMiddleware } from "./middlewares/cors.middleware.js"

const app = express()
app.disable("x-powered-by")
app.use(helmetMiddleware)

app.use(corsMiddleware)
app.use(express.json())

if (consoleLogger && writtenLogger) {
    app.use(consoleLogger)
    app.use(writtenLogger)
}
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/api/v1', apiRouter)

app.get('/', (req, res) => {
    res.redirect('/api-docs')
})

app.use((req, res, next) => {
    return res.status(404).send({ "message": "page not found" })
})

export { app }