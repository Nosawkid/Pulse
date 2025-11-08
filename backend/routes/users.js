import express from 'express'
import { getUsers, makeMod, unMod } from '../controllers/userController.js'
import { verifyRole, verifyToken } from '../middlewares/authMiddleware.js'



const router = express.Router()



router.get("/", verifyToken, verifyRole("admin", "mod"), getUsers)
router.post("/mod/:userId", verifyToken, verifyRole("admin"), makeMod)
router.post("/remove-mod/:userId", verifyToken, verifyRole("admin"), unMod)



export default router