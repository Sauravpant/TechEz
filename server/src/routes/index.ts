import { app } from "../app";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import technicianRoutes from "./technician.routes";
import reportRoutes from "./report.routes";
import reviewRoutes from "./review.routes";
import bookingRoutes from "./booking.routes";
import biddingRoutes from "./bidding.routes";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/technician", technicianRoutes);
app.use("/api/v1/report", reportRoutes);
app.use("/api/v1/review", reviewRoutes);
app.use("/api/v1/booking", bookingRoutes);
app.use("/api/v1/bid", biddingRoutes);
