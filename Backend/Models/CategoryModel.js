const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    catname: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    picname: {
      type: String,
      default: "defaultpic.jpg",
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("category", CategorySchema);