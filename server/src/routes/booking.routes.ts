import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { verifyUser } from "../middlewares/user.middleware";
import {
  acceptManualBooking,
  cancelTechnicianBooking,
  completeManualBooking,
  createManualBookingRequest,
  getTechnicianBookings,
  getUserBookings,
  raiseManualBookingPrice,
  userAgreement,
  userCancelBooking,
} from "../controllers/booking.controller";
import { verifyTechnician } from "../middlewares/technician.middleware";

const router = Router();

router.use(verifyJWT);

router.post("/create-booking", verifyUser, createManualBookingRequest);
router.patch("/raise-booking-price", verifyUser, verifyTechnician, raiseManualBookingPrice);
router.patch("/cancel-technician-booking/:bookingId", verifyUser, verifyTechnician, cancelTechnicianBooking);
router.patch("/accept-booking/:bookingId", verifyUser, verifyTechnician, acceptManualBooking);
router.patch("/complete-booking/:bookingId", verifyUser, verifyTechnician, completeManualBooking);
router.patch("/user-agreement/:bookingId", verifyUser, userAgreement);
router.patch("/cancel-user-booking/:bookingId", verifyUser, userCancelBooking);
router.get("/user-bookings", verifyUser, getUserBookings);
router.get("/technician-bookings", verifyUser, verifyTechnician, getTechnicianBookings);

export default router;
