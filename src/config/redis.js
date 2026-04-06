import { createClient } from 'redis';
import dotenv from 'dotenv'
dotenv.config()

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_SECRET,
    socket: {
        host: 'redis-18286.c273.us-east-1-2.ec2.cloud.redislabs.com',
        port: 18286
    }
});


export default redisClient

