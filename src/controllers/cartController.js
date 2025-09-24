import mongoose from "mongoose";
import Cart from "../models/Cart.js";

export const getCart = async (req, res) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(req.user.id);

    let cart = await Cart.findOne({ userId: userObjectId })
      .populate("items.productId", "name price image");

    if (!cart) {
      return res.json({ userId: req.user.id, items: [] });
    }

    res.json({
      userId: cart.userId,
      items: cart.items
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const userObjectId = new mongoose.Types.ObjectId(req.user.id);
    let cart = await Cart.findOne({ userId: userObjectId });

    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (i) => i.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += Number(quantity);
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();

    // repopulate before sending
    cart = await Cart.findOne({ userId: userObjectId })
      .populate("items.productId", "name price image");

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userObjectId = new mongoose.Types.ObjectId(req.user.id);

    let cart = await Cart.findOne({ userId: userObjectId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (!item) return res.status(404).json({ message: "Item not found in cart" });

    item.quantity = quantity;

    await cart.save();
    cart = await Cart.findOne({ userId: userObjectId })
      .populate("items.productId", "name price image");

    res.json({ items: cart.items });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const userObjectId = new mongoose.Types.ObjectId(req.user.id);

    let cart = await Cart.findOne({ userId: userObjectId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item._id.toString() !== id
    );

    await cart.save();
    cart = await Cart.findOne({ userId: userObjectId })
      .populate("items.productId", "name price image");

    res.json({ items: cart.items });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

