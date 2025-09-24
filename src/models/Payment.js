import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  OrderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  amount: Number,
  status: { type: String, default: "unpaid" },
  method: String,
});

export default mongoose.model("Payment", paymentSchema);
