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
app.use(ddMiddleware)

import productRouter from "./routes/products.route.js"
import { ddMiddleware } from "./middlewares/dd.middleware.js"
app.use("/api/v1/products", productRouter)

