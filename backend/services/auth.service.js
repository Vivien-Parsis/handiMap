import jwt from "jsonwebtoken"
import { jwt_secret } from "../config/server.config.js"

const generateToken = (user) => {
    return jwt.sign({ role: user.role, id_user: user.id_user, mail: user.mail }, jwt_secret, { expiresIn: "3h" })
}

export {
    generateToken
}