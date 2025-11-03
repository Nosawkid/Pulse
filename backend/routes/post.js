import express from 'express'
import { validateNewPost, validateLikes } from '../validations/postValidation.js'
import validate from '../middlewares/schemaValidation.js'
import { verifyToken } from '../middlewares/authMiddleware.js'
import { addPost, commentPost, deletePost, getPost, getPosts, likePost, unlikePost } from '../controllers/postController.js'
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

router.get("/", verifyToken, getPosts)

router.get("/:id", verifyToken, getPost)

router.delete("/:id", verifyToken, deletePost)

router.post("/like/:id", verifyToken, validate(validateLikes), likePost)

router.post("/unlike/:id", verifyToken, unlikePost)

router.post("/comment/:id", verifyToken, commentPost)






export default router