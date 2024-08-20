const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  supplierName: {
    type: String,
    required: true,
  },
  purchaseDate: {
    type: Date,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
    month: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    }
});

module.exports = mongoose.model("Purchase", purchaseSchema);
