import { getAllHandicaps } from '../controllers/handicap.controller.js'
import { Router } from 'express'
const handicapRouter = Router()

handicapRouter.get("/",getAllHandicaps)

export{
    handicapRouter
}