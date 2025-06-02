import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.ts";
import { createReview, getReviewsByTechnician, getMyReviews, deleteReview, updateReview } from "../controllers/review.controller.ts";

const router = express.Router();

router.post("/create/:technicianId", verifyJWT, createReview);
router.get("/technician/:technicianId", getReviewsByTechnician);
router.get("/my", verifyJWT, getMyReviews);
router.patch("/update/:reviewId", verifyJWT, updateReview);
router.delete("/delete/:reviewId", verifyJWT, deleteReview);

export default router;
