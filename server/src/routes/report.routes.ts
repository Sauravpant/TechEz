import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { verifyUser } from "../middlewares/user.middleware";
import { deleteReport, getTechnicianReports, getUserReports, reportTechnician } from "../controllers/report.controller";
import { verifyTechnician } from "../middlewares/technician.middleware";

const router = Router();
router.use(verifyJWT);

router.post("/report-technician/:technicianId", verifyUser, reportTechnician);
router.delete("/delete-report/:reportId", verifyUser, deleteReport);
router.get("/user-reports", verifyUser, getUserReports);
router.get("/technician-reports", verifyTechnician, getTechnicianReports);

export default router;
