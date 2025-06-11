import ratelimit from "../config/upstash.js";

const rateLimiter = async (_,res,next) => {
    try {
        const {success} = await ratelimit.limit("my-limit-key") 
        if(!success) {
            return res.status(429).json({
                message: "Too many request, please try again later",
            })
        }

        next();
    } catch (error) {
        console.error("ERROR!! in rateLimite", error);
        next(error)
    }
}

export default rateLimiter;