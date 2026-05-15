const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    prodid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    picname: {
      type: String,
      default: "defaultpic.jpg",
    },
    prodname: {
      type: String,
      required: true,
      trim: true,
    },
    rate: {
      type: Number,
      required: true,
      min: 0,
    },
    qty: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    tcost: {
      type: Number,
      required: true,
      min: 0,
    },
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("cart", CartSchema);