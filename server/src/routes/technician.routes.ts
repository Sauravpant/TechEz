import { Router } from "express";
import { deleteVerificationDocument, getAllTechnicians, getTechnicianById, updateTechnicianDetails, uploadVerificationDocument } from "../controllers/technician.controller";
import { verifyJWT } from "../middlewares/auth.middleware";
import { verifyTechnician } from "../middlewares/technician.middleware";
import { upload } from "../middlewares/multer.middleware";

const router = Router();

router.get("/get-all-technicians", getAllTechnicians);
router.get("/:technicianId", getTechnicianById);
router.patch("/update-profile", verifyJWT, verifyTechnician, updateTechnicianDetails);
router.patch("/delete-verification-document", verifyJWT, verifyTechnician, deleteVerificationDocument);
router.patch("/upload-verification-document", verifyJWT, verifyTechnician, upload.single("verificationDocument"), uploadVerificationDocument);

export default router;
