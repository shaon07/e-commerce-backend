import log from "@shaon07/express-log"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

export const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// Middleware to add dd function to response
app.use(log)

// Routes to serve
import productRouter from "./routes/products.route.js"
import categoryRouter from "./routes/categories.route.js"
import userRouter from './routes/users.route.js';
import authRouter from "./routes/auth.route.js";

app.use("/api/v1/products", productRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);

