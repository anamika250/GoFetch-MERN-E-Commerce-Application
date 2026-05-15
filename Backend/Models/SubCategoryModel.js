const mongoose = require("mongoose");

const SubCategorySchema = new mongoose.Schema(
  {
    catid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    subcatname: {
      type: String,
      required: true,
      trim: true,
    },
    picname: {
      type: String,
      default: "defaultpic.jpg",
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("subcategory", SubCategorySchema);