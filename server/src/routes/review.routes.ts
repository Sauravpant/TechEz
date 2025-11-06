import { Router } from "express";
import { deleteReview, getTechnicianReviews, getUserReviews, reviewTechnician, updateReview } from "../controllers/review.controller";
import { verifyJWT } from "../middlewares/auth.middleware";
import { verifyUser } from "../middlewares/user.middleware";
import { verifyTechnician } from "../middlewares/technician.middleware";

const router = Router();

router.use(verifyJWT);

router.post("/review-technician/:technicianId", verifyUser, reviewTechnician);
router.patch("/update-review/:reviewId", verifyUser, updateReview);
router.delete("/delete-review/:reviewId", verifyUser, deleteReview);
router.get("/technician-reviews", verifyTechnician, getTechnicianReviews);
router.get("/user-reviews", verifyUser, getUserReviews);

export default router;
