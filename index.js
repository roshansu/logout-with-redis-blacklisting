import e from "express";
import cookieParser from "cookie-parser";
import connectDb from "./src/config/db.js";
import redisClient from "./src/config/redis.js";
import userRouter from "./src/router/userRouter.js";

const app = e()
const PORT = 8000

app.use(e.json())
app.use(cookieParser())

app.use('/user', userRouter)

const initialize = async ()=>{
    try{
        await Promise.all([connectDb(), redisClient.connect()])
        console.log("db connection successfull")
        app.listen(PORT, ()=>{
            console.log("server is listening at "+PORT)
        })
    }catch(err){
        console.log("Err: "+err)
    }
}

initialize()