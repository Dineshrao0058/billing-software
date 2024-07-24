const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productCategory: {
      type: String,
      required: true,
    },
    productWeight: {
      type: Number,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productQuantity: {
      type: Number,
      required: true,
    },
    batchNumber: {
      type: String,
      required: true,
    },
    manufacturingDate: {
      type: Date,
      required: true,
    },
    expirationDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("products", productSchema);
