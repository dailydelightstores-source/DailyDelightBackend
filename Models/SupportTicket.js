import mongoose from "mongoose";

const supportTicketSchema = new mongoose.Schema(
  {
    ticketNumber: {
      type: String,
      unique: true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    email: {
      type: String,
      required: true
    },

    subject: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    category: {
      type: String,
      enum: ["bug", "payment", "order", "delivery", "other"],
      default: "bug"
    },

    status: {
      type: String,
      enum: ["open", "in_progress", "resolved", "closed"],
      default: "open"
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User" // admin / support / developer
    },

    response: {
      type: String // admin reply
    }
  },
  { timestamps: true }
);


supportTicketSchema.pre("save", function (next) {
  if (!this.ticketNumber) {
    const random = Math.floor(100000 + Math.random() * 900000);
    this.ticketNumber = `TICKET-${random}`;
  }
  next();
});

export const SupportTicket = mongoose.model("SupportTicket", supportTicketSchema);

