const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  supplierName: {
    type: String,
    required: true,
  },
  Mobile:{
    type: String,
    required: true,
  },
  Address:{
    type: String,
    required: true,
  },
  purchaseDate: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
   
});

module.exports = mongoose.model("Purchase", purchaseSchema);
