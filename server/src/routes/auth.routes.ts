import { Router } from "express";
import { changePassword, forgotPassword, login, logout, registerTechnician, registerUser, sendOtp } from "../controllers/auth.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register-user", registerUser);
router.post("/register-technician", registerTechnician);
router.post("/login", login);
router.post("/logout", verifyJWT, logout);
router.post("/send-otp", sendOtp);
router.patch("/forgot-password", forgotPassword);
router.patch("/change-password", changePassword);

export default router;
