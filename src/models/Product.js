import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stock: Number,
  image: String,
  category: String,
});

productSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "productId",
  justOne: false,
})

productSchema.set("toObject", { virtuals: true });
productSchema.set("toJSON", { virtuals: true });

export default mongoose.model("Product", productSchema);