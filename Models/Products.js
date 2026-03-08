import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      required: true,
      lowercase: true
    },

    description: {
      type: String
    },

    discountedPrice:{
      type: Number,
      required: true
    },

    purchasingPrice: {
      type: Number,
      required: true
    },

    sellingPrice: {
      type: Number,
      required: true
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },

    brand: {
      type: String
    },

    images: [
      {
        url: String,
        alt: String
      }
    ],

    availableIn: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServiceArea"
      }
    ],

    stock: {
      type: Number,
      default: 0
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

productSchema.index({
  name: "text",
  description: "text",
  brand: "text"
});

export const Products = mongoose.model("Product", productSchema);
