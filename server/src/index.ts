import "dotenv/config";
import connectDB from "./configs/db";
import server from "./app";
import { connectRedis } from "./configs/redis";

const PORT = process.env.PORT || 4000;

connectDB()
  .then(async () => {
    await connectRedis();
  })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
