import IORedis from "ioredis";

export const bullClient = new IORedis(process.env.REDIS_URL);
