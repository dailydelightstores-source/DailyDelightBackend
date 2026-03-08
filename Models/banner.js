import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true
    },

    image: {
      url: {
        type: String,
        required: true
      }
    },
  },
  { timestamps: true }
);

export const Banner = mongoose.model("Banner", bannerSchema);
