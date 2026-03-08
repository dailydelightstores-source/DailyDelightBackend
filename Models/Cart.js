import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true // 🔥 one cart per user
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },

        name: {
          type: String // snapshot (important)
        },

        price: {
          type: Number // snapshot sellingPrice
        },

        quantity: {
          type: Number,
          required: true,
          min: 1
        }
      }
    ],

    totalItems: {
      type: Number,
      default: 0
    },

    totalAmount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export const Cart = mongoose.model("Cart", cartSchema);
