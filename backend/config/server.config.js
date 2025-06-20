import dotenv from "dotenv"
dotenv.config()

const db_url = process.env.DB_URL || ""
const host = process.env.HOST || `localhost`
const port = process.env.PORT || 4000
const jwt_secret = process.env.JWT_SECRET || ""
const frontend_url = process.env.FRONT_URL || "http://localhost"
const node_env = process.env.NODE_ENV || "DEV"

if (!db_url || !jwt_secret) {
    throw new Error("Missing required environment variables")
}

export { db_url, host, port, jwt_secret, frontend_url, node_env }
