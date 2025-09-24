import { isAdmin } from  "../middleware/adminMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import Order from "../models/Order.js";
import { createProduct, deleteProduct } from "../controllers/productController.js";

router.post("/products", authTokenMiddleware, isAdmin, createProduct);
router.delete("/products/:id", authTokenMiddleware, isAdmin, deleteProduct);


const router = express.Router();

// GET all orders (Admin only)
router.get("/orders", protect, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

export default router;