/*import mongoose from "mongoose";

const checkoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  item: [
    {productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
     quantity: Number
     },
    ],
  totalAmount: Number,
  status: { type: String, default: "pending" },
});

export default mongoose.model("Checkout", checkoutSchema)*/
