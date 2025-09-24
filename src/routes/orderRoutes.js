import express from "express";
import  {protect,} from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";
import { checkout, getOrders } from "../controllers/orderController.js";
 

const router = express.Router();

router.post("/checkout", protect, checkout);
router.get("/", protect,isAdmin,getOrders);

export default router;