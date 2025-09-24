/*import mongoose from "mongoose";
import Cart from "../models/Cart.js";
//import Checkout from "../models/Checkout.js";


export const checkout = async (req, res) => {
  try {
     const userObjectId = new mongoose.Types.ObjectId(req.user.id);

    const cart = await Cart.findOne({ userId: userObjectId})
      .populate("items.productId", "name price");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalPrice = cart.items.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0
    );
    const checkout = await Checkout.create({
      userId: req.user.id,
      items: cart.items.map(i => ({
        productId: i.productId._id,
        quantity: i.quantity,
      })),
      totalAmount: totalPrice,
      status: "pending",
    });
    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Checkout successful",
    
    });

  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};*/
