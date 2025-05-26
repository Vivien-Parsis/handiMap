import { rateLimit } from "express-rate-limit"

const rateLimit = rateLimit({
    windowMs: 60 * 1000,
    limit: 100,
})

export { rateLimit }