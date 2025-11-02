import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import express from 'express'
import connectDB from './configs/Db.js'
import authRoutes from './routes/auth.js'
import postRoutes from './routes/post.js'
import { errorHandler, notFound } from './middlewares/errorMiddleware.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 8000




app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


connectDB()



app.get("/", (req, res) => {
    res.json({ message: "Welcome to Pulse APIs.Authenticate yourself and have fun" })
})

app.use("/api/auth", authRoutes)
app.use("/api/posts", postRoutes)
app.use(notFound)
app.use(errorHandler)










app.listen(PORT, () => {
    console.log(`Server running at http://localhost${PORT}`)
})
