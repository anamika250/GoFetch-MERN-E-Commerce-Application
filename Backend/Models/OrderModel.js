const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    uname: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    billamt: {
      type: Number,
      required: true,
      min: 0,
    },
    pmode: {
      type: String,
      required: true,
      enum: ["COD", "CARD", "UPI"],
    },
    cardinfo: {
      type: Object,
      default: {},
    },
    address: {
      type: String,
      required: true,
    },
    orderdate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      default: "Order Confirmed, Processing",
    },
    orderitems: {
      type: [Object],
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("order", OrderSchema);