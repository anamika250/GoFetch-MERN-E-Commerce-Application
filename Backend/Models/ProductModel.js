const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    catid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    subcatid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subcategory",
      required: true,
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
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    description: {
      type: String,
      default: "",
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    picname: {
      type: String,
      default: "defaultpic.jpg",
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("product", ProductSchema);