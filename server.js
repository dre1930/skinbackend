import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectDB from "./config/db.js";
import { dot } from "node:test/reporters";
console.log("paystack key => ", process.env.PAYSTACK_SECRET_KEY);


const PORT = process.env.PORT || 5000;

 
connectDB();

 
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
