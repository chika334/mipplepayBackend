const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema(
  {
    wallet: {
      type: Number,
      default: 0.0,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Wallet", WalletSchema);
