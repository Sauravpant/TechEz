import IORedis from "ioredis";
import logger from "../utils/logger";

export const bullClient = new IORedis(process.env.REDIS_URL,{
  maxRetriesPerRequest: null,
});

bullClient.on("connect", () => {
  logger.info("Successfully connected to Redis");
});

bullClient.on("error", (err) => {
  logger.error(`Redis connection error: ${err.message}`);
});
