import express from "express";
import {
  registerIndividualUser,
  registerTechnician,
  registerBusinessUser,
  logInUser,
  logOutUser,
  resetPassword,
  uploadProfilePicture,
  requestOtp,
  verifyOtp
} from "../controllers/auth.controller.js";
import { upload } from "../middlewares/multer.middleware.ts";
import { verifyJWT } from "../middlewares/auth.middleware.ts";
const router = express.Router();

router.post("/register-individual", registerIndividualUser);
router.post("/register-business", upload.single("panCard"), registerBusinessUser);
router.post("/register-technician", upload.single("panCard"), registerTechnician);
router.post("/login", logInUser);
router.get("/logout", verifyJWT, logOutUser);
router.post("/request-otp",requestOtp);
router.post("/verify-otp",verifyOtp);
router.patch("/reset-password", verifyJWT, resetPassword);
router.patch("/upload-profile-picture", verifyJWT, upload.single("profile"), uploadProfilePicture);

export default router;
