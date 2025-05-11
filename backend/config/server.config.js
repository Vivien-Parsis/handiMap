const dotenv = require("dotenv")
dotenv.config()

const db_url = process.env.DB_URL || ""
const host = process.env.HOST || "localhost"
const port = process.env.PORT || 4000
const jwt_secret = process.env.JWT_SECRET || "JWT"

module.exports = { db_url, host, port, jwt_secret }