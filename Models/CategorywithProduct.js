import mongoose from "mongoose";

const homeSectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    categories: {   
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },

    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      }
    ],

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

homeSectionSchema.index({ order: 1 });
homeSectionSchema.index({ isActive: 1 });

export const CategorywithProductRoute = mongoose.model("HomeSection", homeSectionSchema);