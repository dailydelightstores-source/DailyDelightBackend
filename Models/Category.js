import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true
    },

    aliases: {
      type: [String], // synonyms / alternate names
      default: []
    },

    keywords: {
      type: [String], // SEO + intent words
      default: []
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

categorySchema.index({
  name: "text",
  aliases: "text",
  keywords: "text"
});

export const Category = mongoose.model("Category", categorySchema);
