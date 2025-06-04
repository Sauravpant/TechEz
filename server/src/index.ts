import "dotenv/config";
import connectDB from "./db/index.ts";
import app from "./app.ts";

const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(` Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database");
    console.error(err);
    process.exit(1); 
  });
