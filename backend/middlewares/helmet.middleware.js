import helmet from "helmet";

const helmetMiddleware = helmet({
    contentSecurityPolicy: {
        directives: {
            scriptSrc: [
                "'self'",
                "https://cdnjs.cloudflare.com",
                "'unsafe-inline'",
            ],
            styleSrc: [
                "'self'",
                "https://cdnjs.cloudflare.com",
                "'unsafe-inline'"
            ],
            imgSrc: ["'self'", "data:"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            objectSrc: ["'none'"],
        },
    }
})

export { helmetMiddleware }