import { createClient } from "redis";

export const redisClient = createClient({
  url: process.env.REDIS_URL,
});

export const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Redis client connected");
  } catch (err: any) {
    console.error(" Redis connection error:", err);
  }
};

redisClient.on("error", (err) => console.error("Redis Client Error:", err));
redisClient.on("connect", () => console.log("Redis client connecting..."));
