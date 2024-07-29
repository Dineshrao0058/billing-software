const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

// Connect to MongoDB
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const productRoute = require("./Admin/Routes/productRoute");
port = 5000;
URL = "mongodb://127.0.0.1:27017/billing";

app.listen(port, (err) => {
  if (!err) {
    console.log(`Server running on port ${port}`);
  } else {
    console.log("Error in server connection");
  }
});

mongoose
  .connect(URL)
  .then(console.log("Server connected"))
  .catch((err) => {
    console.log(err);
  });

  app.use("/products",productRoute);