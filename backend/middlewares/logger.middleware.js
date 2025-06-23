import { node_env } from "../config/server.config.js"
import morgan from "morgan"
import fs from 'fs'

if (!fs.existsSync('./log')) {
    fs.mkdirSync('./log', { recursive: true })
}
morgan.token("body", (req, res) => {
    return JSON.stringify(req.body)
})
const accessLogStream = fs.createWriteStream(`${(node_env == "DEV" || node_env == "TEST") ? './log/dev.log' : (node_env == "PROD") ? './log/access.log' : './log/log.log'}`, { flags: 'a' })
const DevLogConsole = 'HTTP :http-version || status code :status || method :method || :date[web] || response time :response-time ms || url :url || :body || :user-agent'
const DevLogWrite = ':http-version;:status;:method;:date[web];:response-time ms;:url;:user-agent;:body'

const ProdLogConsole = 'HTTP :http-version || status code :status || method :method || :date[web] || response time :response-time ms || url :url'
const ProdLogWrite = ':http-version;:status;:method;:date[web];:response-time ms;:url'

const consoleLogger = (node_env == "DEV" || node_env == "TEST") ? morgan(DevLogConsole) : (node_env == "PROD") ? morgan(ProdLogConsole) : ""
const writtenLogger = (node_env == "DEV" || node_env == "TEST") ? morgan(DevLogWrite, { stream: accessLogStream }) : (node_env == "PROD") ? morgan(ProdLogWrite, { stream: accessLogStream }) : ""


export {
    consoleLogger, writtenLogger
}
