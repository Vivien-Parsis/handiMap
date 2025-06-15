import { storage } from "../config/cloudinary.config.js"
import multer from "multer"

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024
    },
    fileFilter: (req, file, callback) => {
        if ((file.mimetype.startsWith("image/") && file.originalname.endsWith(".png")) || (file.mimetype.startsWith("image/") && file.originalname.endsWith(".webp")) || (file.mimetype.startsWith("image/") && file.originalname.endsWith(".jpeg")) || (file.mimetype.startsWith("image/") && file.originalname.endsWith(".jpg"))) {
            return callback(null, true)
        } else {
            return callback(new Error("Seulement les images sont accepté"), false)
        }
    }
})

export { upload }