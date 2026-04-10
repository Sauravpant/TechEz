import { Router } from "express";
import { createBidRequest } from "../controllers/bidding.controller";
import { verifyJWT } from "../middlewares/auth.middleware";
import { verifyUser } from "../middlewares/user.middleware";

const router = Router();
router.use(verifyJWT);
router.use(verifyUser);

router.post("/create-bid", createBidRequest);


export default router;
