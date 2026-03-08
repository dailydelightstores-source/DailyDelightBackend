import mongoose from "mongoose";

const yearlyAnalyticsSchema = new mongoose.Schema(
  {
    year: {
      type: Number,
      required: true,
      unique: true
    },

    totalOrders: {
      type: Number,
      default: 0
    },

    totalItemsSold: {
      type: Number,
      default: 0
    },

    grossRevenue: {
      type: Number,
      default: 0 // sum of sellingPrice
    },

    totalCost: {
      type: Number,
      default: 0 // sum of purchasingPrice
    },

    netProfit: {
      type: Number,
      default: 0 // grossRevenue - totalCost
    }
  },
  { timestamps: true }
);

export const YearlyAnalytics = mongoose.model(
  "YearlyAnalytics",
  yearlyAnalyticsSchema
);
