import cors from "cors"
import { host, port, frontend_url } from "../config/server.config.js"

const corsMiddleware = cors({
    origin: [`http://${host}:${port}`, frontend_url],
    credentials: true
})

export { corsMiddleware }