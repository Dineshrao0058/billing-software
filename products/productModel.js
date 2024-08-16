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
      type: String,
      required: true,
    },
    productUnit: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productStock: {
      type: String,
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
    purchaseDate: {
      type: Date,
      required: true,
    },
    expirationDate: {
      type: Date,
      required: true,
    },
    createdBY: {
      type: String,
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
    updatedBY: {
      type: String,
    },
    updatedDate: {
      type: Date,
    },
    productStatus: {
      type: String,
      default: "active",
      enum: ["active", "inactive"],
    },
    description: {
      type: String,
      required: true,
    },
    salePercentage: {
      type: Number,
      required: true,
    },
    gstPercentage: {
      type: Number,
      required: true,
    },
    salePrice: {
      type: Number,
      required: true,
    },
    gstAmount: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
