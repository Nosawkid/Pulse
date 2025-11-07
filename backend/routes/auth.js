import express from 'express'
const router = express.Router()
import { loginUser, logout, refreshToken, registerUser } from '../controllers/authController.js'
import { loginValidation, registerValidation } from '../validations/authValidation.js'
import validate from '../middlewares/schemaValidation.js'


router.post("/register", validate(registerValidation), registerUser)

router.post("/login", validate(loginValidation), loginUser)

router.post("/logout", logout)

router.get("/refresh", refreshToken)









export default router