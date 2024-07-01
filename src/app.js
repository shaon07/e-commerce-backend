import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { ddMiddleware } from "./middlewares/dd.middleware.js"

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

// Routes to serve
import productRouter from "./routes/products.route.js"
import categoryRouter from "./routes/categories.route.js"

app.use("/api/v1/products", productRouter);
app.use("/api/v1/categories", categoryRouter);

