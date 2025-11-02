import express from 'express'
import { validateNewPost } from '../validations/postValidation.js'
import validate from '../middlewares/schemaValidation.js'
import { verifyRole, verifyToken } from '../middlewares/authMiddleware.js'
import { addPost, getPosts } from '../controllers/postController.js'
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from '../configs/cloudinary.js'


const router = express.Router()

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "pulse_uploads",
        allowed_formats: ["jpg", "jpeg", "png", "webp"]
    }
})

const upload = multer({ storage })

router.post("/", verifyToken, validate(validateNewPost), upload.single("image"), addPost)

router.get("/", verifyToken, verifyRole("admin", "mod"), getPosts)

router.get("/:id", (req, res) => {
    res.json({ message: "Get post" })
})

router.delete("/:id", (req, res) => {
    res.json({ message: "Delete Post" })
})






export default router