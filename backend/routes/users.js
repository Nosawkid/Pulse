import express from 'express'
import { getUsers, makeMod } from '../controllers/userController.js'
import { verifyRole, verifyToken } from '../middlewares/authMiddleware.js'



const router = express.Router()



router.get("/", verifyToken, verifyRole("admin", "mod"), getUsers)
router.post("/mod/:userId", verifyToken, verifyRole("admin"), makeMod)



export default router