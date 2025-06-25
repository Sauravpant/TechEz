import express from "express";
import { verifyAdmin } from "../middlewares/admin.middleware.ts";
import { verifyJWT } from "../middlewares/auth.middleware.ts";
import { getAllTechnicians,getPendingBusinesses,getPendingTechnicians, verifyBusiness, verifyTechnician, deleteUser } from "../controllers/admin.controller.ts";

const router = express.Router();

router.get("/get/technicians", verifyJWT,verifyAdmin, getAllTechnicians);
router.get("/get/pending-technicians",verifyJWT ,getPendingTechnicians);
router.get("/get/pending-businesses",verifyJWT, verifyAdmin, getPendingBusinesses);
router.patch("/verify/business/:id", verifyJWT,verifyAdmin, verifyBusiness);
router.patch("/verify/technician/:id",verifyJWT, verifyAdmin, verifyTechnician);
router.delete("/delete/user", verifyJWT,verifyAdmin, deleteUser);


export default router;