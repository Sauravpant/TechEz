import express, { Router } from "express";
import {
  registerIndividualUser,
  registerTechnician,
  registerBusinessUser,
  logInUser,
  logOutUser,
  resetPassword,
  uploadProfilePicture,
} from "../controllers/auth.controller.ts";
import { upload } from "../middlewares/multer.middleware.ts";
import { verifyJWT } from "../middlewares/auth.middleware.ts";
const router = express.Router();

router.post("/register-individual", registerIndividualUser);
router.post("/register-business", upload.single("panCard"), registerBusinessUser);
router.post("/register-technician", upload.single("panCard"), registerTechnician);
router.get("/login", logInUser);
router.get("/logout", verifyJWT, logOutUser);
router.patch("/reset-password", verifyJWT, resetPassword);
router.patch("/upload-profile-picture", verifyJWT, upload.single("profile"), uploadProfilePicture);

export default router;
