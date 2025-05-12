const dotenv = require("dotenv")
dotenv.config()

const db_url = process.env.DB_URL || ""
const host = process.env.HOST || "localhost"
const port = process.env.PORT || 4000
const jwt_secret = process.env.JWT_SECRET || "JWT"
const frontend_url = process.env.FRONT_URL || "http://localhost:3000"

module.exports = { db_url, host, port, jwt_secret, frontend_url }