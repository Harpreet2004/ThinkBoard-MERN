import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import router from "./routes/notes.routes.js"
import {connectDB} from "./config/db.js"
import rateLimiter from "./middlewares/rateLimiter.middleware.js"

dotenv.config()

const PORT = process.env.PORT || 5001;
const app = express()


app.use(cors({
    origin: "http://localhost:5173"
}))
app.use(express.json())
app.use(rateLimiter);
app.use("/api/notes", router)


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server is listening at ${PORT}`)
    })
})