import { storage } from "../config/cloudinary.config.js"
import multer from "multer"

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
})

export { upload }