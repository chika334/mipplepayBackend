const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      min: 6,
      trim: true,
      require: true,
    },
    lastName: {
      type: String,
      min: 6,
      trim: true,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      require: true,
    },
    phone: {
      require: true,
      type: String,
      max: 11,
      min: 11,
    },
    countryCode: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    walletId: String,
  },
  { timestamp: true }
);

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  return token;
};

module.exports = mongoose.model("User", UserSchema);
