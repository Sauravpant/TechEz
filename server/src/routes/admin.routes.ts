import express from "express";
import { verifyAdmin } from "../middlewares/admin.middleware.ts";
import { getAllTechnicians,getPendingBusinesses,getPendingTechnicians, verifyBusiness, verifyTechnician, deleteUser } from "../controllers/admin.controller.ts";

const router = express.Router();

router.get("/get/technicians", verifyAdmin, getAllTechnicians);
router.get("/get/pending-technicians", verifyAdmin, getPendingTechnicians);
router.get("/get/pending-businesses", verifyAdmin, getPendingBusinesses);
router.patch("/verify/business", verifyAdmin, verifyBusiness);
router.patch("/verify/technician", verifyAdmin, verifyTechnician);
router.delete("/delete/user", verifyAdmin, deleteUser);


export default router;