import express, { Express } from "express";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import errorMiddleware from "./middlewares/error-handler.middleware";
import logger from "./utils/logger";
import { Server } from "socket.io";

export const app: Express = express();
export const server = createServer(app);
//Middlewares
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "1000kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(mongoSanitize()); // NoSQL injection prevention
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

//Socket configuration
export const io: Server = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH"],
  },
});

io.on("connection", (socket) => {
  logger.info(`A client with socket id ${socket.id} connected`);

  socket.on("joinTechnicianRoom", (data: { technicianId: string; category: string }) => {
    //Join the room based on technician id to receive manual bookings on real time
    socket.join(data.technicianId);

    //Next join the room based on category to receive the bookings made through bid method
    socket.join(data.category);

    //Notify the client that they have joined the rooms
    socket.emit("joinedRoom", `Joined rooms: ${data.technicianId} and ${data.category}`);

    logger.info(`Socket with id ${socket.id} joined rooms: ${data.technicianId} and ${data.category}`);
  });
});

import "./routes/index";
app.use(errorMiddleware);

export default app;
