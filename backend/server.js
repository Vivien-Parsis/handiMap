import { app } from "./app.js"
import { host, port } from "./config/server.config.js"

//listen
app.listen({ host: host, port: port }, () => {
    console.log(`This server is listen on http://${host}:${port}`)
})