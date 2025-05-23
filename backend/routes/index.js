import { userRouter } from "./user.route.js"
import { authRouter } from "./auth.route.js"
import { handicapRouter } from "./handicap.route.js"
import { etablissementRouter } from "./etablissement.route.js"
import { ownerRouter } from "./owner.route.js"

import { Router } from "express"
const apiRouter = Router()

apiRouter.use('/auth', authRouter)
apiRouter.use('/users', userRouter)
apiRouter.use('/handicaps', handicapRouter)
apiRouter.use('/etablissements', etablissementRouter)
apiRouter.use('/owners', ownerRouter)

export { apiRouter }