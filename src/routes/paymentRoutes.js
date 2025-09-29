import express from "express";
import { processPayment,verifyPayment } from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/initialize", protect, processPayment);
router.get("/verify/:reference", verifyPayment);
router.get("/payment-staus", verifyPayment);

export default router;
