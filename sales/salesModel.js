const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    saleQuantity: {
      type: Number,
      required: true,
    },
    salePrice: {
      type: Number,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    customerMobile: {
      type: String,
      required: true,
    },
    saleDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("sales", salesSchema);
