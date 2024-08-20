const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
    saleQuantity: {
      type: Number,
    },
    salePrice: {
      type: Number,
    },
    customerName: {
      type: String,
    },
    customerMobile: {
      type: String,
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
