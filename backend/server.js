const { app } = require("./app")
const { host, port } = require("./config/server.config")

//listen
app.listen({ host: host, port: port }, () => {
    console.log(`This server is listen on http://${host}:${port}`)
})