import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      qty:{ type: Number, required: true},
      price: { type: Number, required: true },
    }
],
    shippingAddress: {
    fullName: String,
    email: String,
    address: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    Phone: String,
  },
 deliveryMethod: { type: String, enum: ["ship", "store"], default: "ship" },
  paymentMethod: { type: String, enum: ["paystack", "bank"], required: true },
  status: { type: String, enum: ["pending", "paid", "shipped", "delivered", "cancelled"], default: "pending" },
  subtotal: Number,
  shippingFee: Number,
  vat: Number,
  total: Number,
},  { timestamps: true });

export default mongoose.model("Order", orderSchema);
