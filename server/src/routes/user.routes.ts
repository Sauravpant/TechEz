import express from "express";
import { updateDetails, createBooking, getMyBookings, cancelBooking, deleteAccount } from "../controllers/user.controller.ts";

import { verifyJWT } from "../middlewares/auth.middleware.ts";

const router = express.Router();

router.patch("/update-details", verifyJWT, updateDetails);
router.post("/book/:technicianId", verifyJWT, createBooking);
router.get("/my-bookings", verifyJWT, getMyBookings);
router.delete("/cancel-booking/:bookingId", verifyJWT, cancelBooking);
router.delete("/delete-account", verifyJWT, deleteAccount);

export default router;
