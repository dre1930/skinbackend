import express from "express";
import { getCart, 
    addToCart,
    updateCart,
removeFromCart, } from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/get", protect, getCart);
router.post("/add", protect, addToCart);
router.put("/update", protect, updateCart);
router.delete("/remove/:id", protect, removeFromCart);

export default router;
