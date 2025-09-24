import express from "express";
//import { getProducts, createProduct, getProductById } from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
import {isAdmin} from "../middleware/adminMiddleware.js"; 
import Product from "../models/Product.js";
import { uploadImage } from "../controllers/uploadControllers.js";
import multer from "multer";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });


const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/",upload.single("image"), protect,createProduct);



router.put("/:id", protect, updateProduct);
router.delete("/:id", protect,deleteProduct);

export default router;
