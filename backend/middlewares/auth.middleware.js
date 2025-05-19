import { jwt_secret } from "../config/server.config.js"
import jwt from "jsonwebtoken"
import { userModel } from "../models/user.model.js"

const checkRouteJwt = async (req, res, next) => {
    const token = req.headers.authorization || ""
    if (!token) {
        return res.status(401).send({ "message": "missing jwt token" })
    }
    try {
        const decoded = jwt.verify(token, jwt_secret)
        const userSearch = await userModel.findById(decoded.id_user)
        if(userSearch.id_user==decoded.id_user && userSearch.role==decoded.role && userSearch.email==decoded.email){
            req.user = decoded
            next()
        }else{
            return res.status(403).send({ "message": "error with jwt token", error:err })
        }
    }catch(err){
        return res.status(403).send({ "message": "error while decode or search for token", error:err })
    }
}

const checkAdminRouteJwt = async (req, res, next) => {
    const token = req.headers.authorization || ""
    if (!token) {
        return res.status(401).send({ "message": "missing jwt token" })
    }
    try {
        const decoded = jwt.verify(token, jwt_secret)
        const userSearch = await userModel.findById(decoded.id_user)
        if(userSearch.id_user==decoded.id_user && userSearch.role==decoded.role && userSearch.email==decoded.email && userSearch.role=="admin"){
            req.user = decoded
            next()
        }else{
            return res.status(403).send({ "message": "error with jwt token", error:err })
        }
    }catch(err){
        return res.status(403).send({ "message": "error while decode or search for token", error:err })
    }
}

const checkOwnerRouteJwt = async (req, res, next) => {
    const token = req.headers.authorization || ""
    if (!token) {
        return res.status(401).send({ "message": "missing jwt token" })
    }
    try {
        const decoded = jwt.verify(token, jwt_secret)
        const userSearch = await userModel.findById(decoded.id_user)
        if(userSearch.id_user==decoded.id_user && userSearch.role==decoded.role && userSearch.email==decoded.email && (userSearch.role=="owner" || userSearch.role=="admin")){
            req.user = decoded
            next()
        }else{
            return res.status(403).send({ "message": "error with jwt token", error:err })
        }
    }catch(err){
        return res.status(403).send({ "message": "error while decode or search for token", error:err })
    }
}

export {
    checkRouteJwt,
    checkOwnerRouteJwt,
    checkAdminRouteJwt
}