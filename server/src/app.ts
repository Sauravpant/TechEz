import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import {rateLimit} from "express-rate-limit";
import errorMiddleware from "./middlewares/error.middleware.ts";

const app = express();

//Middlewares
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "15kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(mongoSanitize()); // NoSQL injection prevention
app.use(express.static("public"));

// Rate Limiter
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
  })
);

import authRoute from "./routes/auth.routes.ts";
import reviewRoute from "./routes/review.routes.ts";
import userRoute from "./routes/user.routes.ts";
import technicianRoute from "./routes/technician.routes.ts";
import businessRoute from "./routes/business.routes.ts";
import adminRoute from "./routes/admin.routes.ts";

app.use("/api/auth", authRoute);
app.use("/api/review", reviewRoute);
app.use("/api/user", userRoute);
app.use("/api/technician", technicianRoute);
app.use("/api/business", businessRoute);
app.use("/api/admin", adminRoute);



app.use(errorMiddleware);

export default app;
