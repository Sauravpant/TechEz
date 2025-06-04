import express from "express";
import {
  updateTechnicianProfile,
  deleteTechnicianAccount,
  getAssignedBookings,
  updateBookingStatus,
  markBookingAsPaid,
} from "../controllers/technician.controller.ts";

import { verifyJWT } from "../middlewares/auth.middleware.ts";
import { verifyTechnician } from "../middlewares/technician.middleware.ts";

const router = express.Router();

router.patch("/update-profile", verifyJWT, verifyTechnician, updateTechnicianProfile);
router.delete("/delete-account", verifyJWT, verifyTechnician, deleteTechnicianAccount);
router.get("/assigned-bookings", verifyJWT, verifyTechnician, getAssignedBookings);
router.patch("/update-status/:bookingId", verifyJWT, verifyTechnician, updateBookingStatus);
router.patch("/mark-paid/:bookingId", verifyJWT, verifyTechnician, markBookingAsPaid);

export default router;
