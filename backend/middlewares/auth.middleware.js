const { jwt_secret } = require("../config/server.config")
const jwt = require('jsonwebtoken')

const checkRouteJwt = (req, res, next) => {
    const token = req.headers.authorization || ""
    if (!token) {
        return res.status(401).send({ "message": "missing jwt token" })
    }
    try {
        const decoded = jwt.verify(token, jwt_secret)
        req.user = decoded
        next()
    }catch(err){
        return res.status(403).send({ "message": "error with jwt token" })
    }
}

const checkAdminRouteJwt = (req, res, next) => {
    const token = req.headers.authorization || ""
    if (!token) {
        return res.status(401).send({ "message": "missing jwt token" })
    }
    try {
        const decoded = jwt.verify(token, jwt_secret)
        if(token.role=="admin"){
            return next()
        }else{
            return res.status(401).send({ "message": "not a admin" })
        }
    }catch(err){
        return res.status(403).send({ "message": "error with jwt token" })
    }
}

module.exports = {
    checkRouteJwt,
    checkAdminRouteJwt
}