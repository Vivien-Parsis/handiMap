import dotenv from "dotenv"
dotenv.config()

const db_url = process.env.DB_URL || ""
const host = ("RENDER" in process.env) ? `0.0.0.0` : `localhost`
const port = process.env.PORT || 4000
const jwt_secret = process.env.JWT_SECRET || ""
const frontend_url = process.env.FRONT_URL || "http://localhost:3000"

if (!db_url || !jwt_secret) {
    throw new Error("Missing required environment variables")
}

export { db_url, host, port, jwt_secret, frontend_url }