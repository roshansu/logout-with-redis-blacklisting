import validate from '../lib/validate.js'
import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import redisClient from '../config/redis.js'
import dotenv from 'dotenv'
dotenv.config()

export const register = async (req, res)=>{
    try{
        const {email, password} = req.body
        if(!email || !password){
            res.send("required email or password")
            return
        }
        validate(req.body)

        const isExist = await User.findOne({email})

        if(isExist){
            res.send("User already exist")
            return
        }

        const hashPass = await bcrypt.hash(password, 10)
        req.body.password = hashPass

        const user = await User.create(req.body)

        const token = jwt.sign({_id: user._id, email}, process.env.JWT_SECRET, {expiresIn: '7d'})

        res.cookie("token", token)
        res.send("register done")

    }catch(err){
        console.log(err)
        res.send("err: "+err)
    }
}


export const login = async (req, res)=>{
    try{
        const {email, password} = req.body || false
        console.log(email, password)
        if(!email || !password){
            res.send("missing email or password")
            return
        }

        const user = await User.findOne({email})

        if(!user){
            res.send("User does not exist")
            return
        }

        const isAllowed = await bcrypt.compare(password, user.password)

        if(!isAllowed){
            res.send("Invalid email or password")
            return
        }

        const token = jwt.sign({_id: user._id, email}, process.env.JWT_SECRET, {expiresIn: "7d"})
        res.cookie("token", token)
        res.send("login success")

    }catch(err){
        console.log("Err: "+err)
        res.send("Err: "+err)
    }
}


export const logout = async (req, res)=>{
    try{
        const {token} = req.cookies
        console.log("token", token)
        const payload = jwt.decode(token)
        console.log(payload)
        const {exp} = payload
        await redisClient.set(`token:${token}`, "blocked")
        await redisClient.expireAt(`token:${token}`, exp)

        res.cookie("token", null, {expires: new Date(Date.now())})
        res.send("logout success")

    }catch(err){
        console.log("err: "+err)
        res.send("Err: "+err)
    }
}