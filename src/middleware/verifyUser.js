import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/user.js'
import redisClient from '../config/redis.js'
dotenv.config()

 const verifyUser = async(req, res, next) =>{
    try{

        const {token} = req.cookies
        const payload = jwt.verify(token, process.env.JWT_SECRET)

        const {_id} = payload
        if(!_id){
            throw new Error("Invalid user")
        }

        const user = await User.findById({_id})

        if(!user){
            throw new Error("User does not exist")
        }

        const isBlocked = await redisClient.exists(`token:${token}`)

        console.log(isBlocked)

        if(isBlocked){
            throw new Error("Invalid token")
        }

        req.result = user

        next()
    }catch(err){
        console.log("err: "+err)
        res.send("Err: "+err)
    }
}

export default verifyUser