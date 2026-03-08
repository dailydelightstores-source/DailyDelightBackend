import mongoose from "mongoose";

const serviceAreaSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      default: "India"
    },

    state: {
      type: String,
      required: true
    },

    city: {
      type: String,
      required: true
    },

    postalCodes: {
      type: Number,
      required: true
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export const ServiceArea =  mongoose.model("ServiceArea", serviceAreaSchema);
