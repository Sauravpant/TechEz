import "dotenv/config";
import connectDB from "./configs/db";
import { server } from "./app";
import { connectRedis } from "./configs/redis";
import logger from "./utils/logger";

const PORT = process.env.PORT || 4000;

connectDB()
  .then(async () => {
    await connectRedis();
  })
  .then(() => {
    server.listen(PORT, () => {
      logger.info(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    logger.error(err);
    process.exit(1);
  });
