import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { deleteUserProfilePicture, getUserProfile, updateUserProfile, uploadUserProfilePicture } from "../controllers/user.controller";
import { upload } from "../middlewares/multer.middleware";

const router = Router();

router.use(verifyJWT);

router.patch("/update-profile", updateUserProfile);
router.patch("/upload-profile-picture", upload.single("profilePicture"), uploadUserProfilePicture);
router.get("/profile", getUserProfile);
router.delete("/delete-profile-picture", deleteUserProfilePicture);

export default router;
