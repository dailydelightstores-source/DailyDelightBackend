import mongoose from "mongoose";

const paymentMethodSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    provider: {
      type: String,
      enum: ["stripe", "razorpay", "paypal"],
      required: true
    },

    paymentType: {
      type: String,
      enum: ["card", "upi", "wallet"],
      required: true
    },

    cardBrand: {
      type: String // Visa, MasterCard, RuPay
    },

    last4: {
      type: String // ONLY last 4 digits
    },

    expiryMonth: Number,
    expiryYear: Number,

    paymentToken: {
      type: String,
      required: true // token from gateway
    },

    isDefault: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("PaymentMethod", paymentMethodSchema);
