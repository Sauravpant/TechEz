import express from "express";
import {
  updateBusinessProfile,
  deleteBusinessAccount,
  createBusinessBooking,
  getMyBusinessBookings,
  cancelBusinessBooking,
} from "../controllers/businessUser.controller.ts";

import { verifyJWT } from "../middlewares/auth.middleware.ts";
import { verifyBusinessUser } from "../middlewares/businessUser.middleware.ts";

const router = express.Router();

router.patch("/update-profile", verifyJWT, verifyBusinessUser, updateBusinessProfile);
router.delete("/delete-account", verifyJWT, verifyBusinessUser, deleteBusinessAccount);
router.post("/book/:technicianId", verifyJWT, verifyBusinessUser, createBusinessBooking);
router.get("/my-bookings", verifyJWT, verifyBusinessUser, getMyBusinessBookings);
router.delete("/cancel-booking/:bookingId", verifyJWT, verifyBusinessUser, cancelBusinessBooking);

export default router;
