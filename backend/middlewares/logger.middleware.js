import { node_env } from "../config/server.config.js"
import morgan from "morgan"
import fs from 'fs'

if (!fs.existsSync('../log')) {
    fs.mkdirSync('../log', { recursive: true })
}

const accessLogStream = fs.createWriteStream('../log/access.log', { flags: 'a' })
const DevLogConsole = 'HTTP :http-version || status code :status || method :method || :date[web] || response time :response-time ms || url :url || :user-agent'
const DevLogWrite = ':http-version;:status;:method;:date[web];:response-time ms;:url;:user-agent'

const ProdLogConsole = 'HTTP :http-version || status code :status || method :method || :date[web] || response time :response-time ms || url :url'
const ProdLogWrite = ':http-version;:status;:method;:date[web];:response-time ms;:url'

const consoleLogger = (node_env == "DEV" || node_env == "TEST") ? morgan(DevLogConsole) : (node_env == "PROD") ? morgan(ProdLogConsole) : ""
const writtenLogger = (node_env == "DEV" || node_env == "TEST") ? morgan(DevLogWrite, { stream: accessLogStream }) : (node_env == "PROD") ? morgan(ProdLogWrite, { stream: accessLogStream }) : ""


export {
    consoleLogger, writtenLogger
}
