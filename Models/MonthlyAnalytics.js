import mongoose from "mongoose";

const monthlyAnalyticsSchema = new mongoose.Schema(
  {
    year: {
      type: Number,
      required: true
    },

    month: {
      type: Number,
      required: true, // 1 = Jan, 12 = Dec
      min: 1,
      max: 12
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
      default: 0
    },

    totalCost: {
      type: Number,
      default: 0
    },

    netProfit: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

/* 🔥 One document per month per year */
monthlyAnalyticsSchema.index({ year: 1, month: 1 }, { unique: true });

export const MonthlyAnalytics = mongoose.model(
  "MonthlyAnalytics",
  monthlyAnalyticsSchema
);
