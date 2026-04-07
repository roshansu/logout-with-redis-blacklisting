import redisClient from "../config/redis.js";

// const rateLimit = async(req, res, next)=>{
//     try{
//         console.log(req.ip)
//         const ip = req.ip
//         console.log("ip", ip)

//         const isExist = await redisClient.get(ip)
//         if(!isExist){
//             await redisClient.set(ip, `${1}:${Date.now()/1000}`)
//             await redisClient.expire(ip, 600)
//         }
//         else{
//             let [count, interval] = isExist.split(':').map((val)=>Number(val))

//             console.log("count", count++, "interval", interval)
//             const inter = (Date.now()/1000) - interval

//             console.log("inter", inter)
//             if(inter<4){
//                 throw new Error("try after some time")
//             }
//             if(count > 5){
//                 throw new Error("limit exceed")
//             }
//             await redisClient.set(ip, `${count}:${Date.now()/1000}`)
//         }

//         next()

//     }catch(err){
//         console.log(err)
//         res.send("Err: "+err)
//     }
// }

const windowSize = 3600
const maxRequest = 6

const rateLimit = async(req, res, next)=>{
    try{
        const key = `IP${req.ip}`
        console.log(key)
        const currentTime = Date.now()/1000
        const windowTime = currentTime - windowSize

        await redisClient.zRemRangeByScore(key, 0, windowTime)

        const numberOfRequest = await redisClient.zCard(key)
        console.log("no.request", numberOfRequest)
        if(numberOfRequest>maxRequest){
            throw new Error("Limit exceeded")
        }

        await redisClient.zAdd(key, [{score: currentTime, value: `${currentTime}:${Math.random()}`}])
        await redisClient.expire(key,windowSize)
        next()
    }catch(err){
        console.log("Err: "+err)
        res.send("Err: "+err)
    }
}

export default rateLimit