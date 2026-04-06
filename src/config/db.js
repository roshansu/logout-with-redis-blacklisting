import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connectDb = async ()=>{
    try{
        mongoose.connect(process.env.MONGO_URL)
        console.log("DB connected")
    }catch(err){
        console.log("Err: "+err)
    }
}

export default connectDb