import axios from "axios";
import Order from "../models/Order.js";
import Payment from "../models/Payment.js";


export const processPayment = async (req, res) => {
  try {
    const { email, total,orderId } = req.body;

    const paystackRes = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        metadata: { orderId },
        amount: total * 100, // in kobo
        callback_url: "https://skinbackend-ew51.onrender.com/payment-status", 

      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

     await Payment.create({
      amount: total,
      status: "pending",
      method: "paystack",
      reference: paystackRes.data.data.reference,
    });


    res.json(paystackRes.data.data); // send authorization_url to frontend
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment initialization failed" });
  }
};


export const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.params;

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const paymentData = response.data.data;

    if (paymentData.status === "success") {
      const payment = await Payment.findOneAndUpdate(
        { reference },
        { status: "completed" },
        { new: true }
      );

      if (paymentData.metadata?.orderId) {
        await Order.findByIdAndUpdate(
          paymentData.metadata.orderId,
          { status: "paid" }
      );
      } 
      return res.json({sucess:true,
        status: "success",
         message: "Payment verified and order updated", 
        payment: payment, 
      });
    }

    await Payment.findOneAndUpdate(
      { reference },
      { status: "failed" }
    );

    res.json( {
      success: false,
      status: "failed",
      message: "Payment verification failed",
    });
  } catch (err) {
    console.error("Verify Payment Error:", err.response?.data || err.message);
    res.status(500).json({ message: "Payment verification failed" });
  }
};
