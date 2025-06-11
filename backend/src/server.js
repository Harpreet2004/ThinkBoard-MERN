import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import path from "path"

import router from "./routes/notes.routes.js"
import {connectDB} from "./config/db.js"
import rateLimiter from "./middlewares/rateLimiter.middleware.js"

dotenv.config()

const PORT = process.env.PORT || 5001;
const app = express()
const __dirname = path.resolve();


//middlewares
if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173"
    }))
}
app.use(express.json())
app.use(rateLimiter);
app.use("/api/notes", router)

if(process.env.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    try {
        app.get("/*", (req,res) => {
        res.sendFile(path.join(__dirname,"../frontend","dist", "index.html"))
    })
    } catch (error) {
        console.log("ERROR in server path.join");
        console.log(error.message);  
    }
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server is listening at ${PORT}`)
    })
})