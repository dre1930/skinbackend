import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Payment from "../models/Payment.js";

export const checkout = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id })
      .populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate amounts
    const subtotal = cart.items.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0
    );
    const shippingFee = req.body.shippingFee || 0;
    const vat = 0.0075 * subtotal;
    const total = subtotal + shippingFee + vat;

    // ✅ Create the order
    const order = await Order.create({
      userId: req.user.id,
      items: cart.items.map(i => ({
        productId: i.productId._id,
        qty: i.quantity,              // match schema
        price: i.productId.price,     // match schema
      })),
      shippingAddress: {
        fullName: req.body.fullName,
        email: req.body.email,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        postalCode: req.body.postalCode,
        country: req.body.country || "Nigeria",
        Phone: req.body.phone,
      },
      deliveryMethod: req.body.delivery || "ship",
      paymentMethod: req.body.payment || "paystack", // ✅ required
      subtotal,
      shippingFee,
      vat,
      total,
      status: "pending",
    });



    const payment= await Payment.create({
      orderId: order._id,
      amount: total,
      method: req.body.payment || "paystack",
      status: "pending",
    });

     
    // Clear the cart
    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: "Order placed successfully 🎉",
      order,
    });

  } catch (err) {
    console.error("checkout error:", err);

    res.status(500).json({ message: err.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate("items.productId")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
