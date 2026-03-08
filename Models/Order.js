import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // 👤 Customer
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // 🧺 Purchased products (MULTIPLE)
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        name: String,        // snapshot (important)
        price: Number,      // snapshot
        quantity: {
          type: Number,
          required: true,
          min: 1
        }
      }
    ],

    // 🚚 Delivery / Order Status
    orderStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "packed",
        "out_for_delivery",
        "delivered",
        "cancelled",
        "returned"
      ],
      default: "pending"
    },

    // 💰 Payment
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending"
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "card", "upi", "netbanking"]
    },

    // 🏠 Address (snapshot or reference)
    shippingAddress: {
      fullName: String,
      phone: String,
      addressLine1: String,
      city: String,
      state: String,
      postalCode: String,
      country: String
    },

    // 👨‍💼 Assigned Sales / Delivery Person
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // role = sales / delivery
      default: null
    },

    // 💵 Totals
    totalItems: Number,
    totalAmount: Number,

    // ⏱️ Status timestamps
    deliveredAt: Date,
    cancelledAt: Date
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
