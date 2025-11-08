import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./configs/Db.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";
import userRoutes from "./routes/users.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import appLimiter from "./configs/appLimiter.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

const allowedOrigins = [
    "http://localhost:5173",
    "https://pulse-frontend.onrender.com",
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);

app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(appLimiter);

connectDB();

app.get("/", (req, res) => {
    res.json({
        message:
            "Welcome to Pulse APIs. Authenticate yourself and have fun 🚀",
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
