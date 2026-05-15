const mongoose = require("mongoose");

const RegisterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
      match: [/^[A-Za-z\s]+$/, "Name can contain only letters and spaces"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^[0-9]{10}$/, "Phone number must be exactly 10 digits"],
    },

    username: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email address"],
    },

    pass: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
        "Password must include uppercase, lowercase, number and special character",
      ],
    },
    usertype: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    isActivated: {
      type: Boolean,
      default: false,
    },

    actcode: {
      type: String,
      default: "",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const RegisterModel = mongoose.model("register", RegisterSchema, "register");

module.exports = { RegisterModel };
