const express = require("express")
const cors = require("cors")
const { host, port } = require("./config/server.config")
const { userRouter } = require("./routes/user.route")
const { authRouter } = require("./routes/auth.route")
const { checkRouteJwt } = require("./middlewares/auth.middleware")
const { handicapRouter } = require("./routes/handicap.route")
const { etablissementModel } = require("./models/etablissement.model")

const app = express()

//plugin
app.use(cors({
    origin: `http://${host}:${port}`,
    credentials: true
}))
app.use(express.json())
//route
app.use('/auth', authRouter)
app.use('/user', checkRouteJwt, userRouter)
app.use('/handicap', checkRouteJwt, handicapRouter)
app.use('/etablissement', checkRouteJwt, etablissementModel)

app.use((req, res, next) => {
    return res.status(404).send({ "message": "page not found" })
})
//listen
app.listen({ host: host, port: port }, () => {
    console.log(`This server is listen on http://${host}:${port}`);
})