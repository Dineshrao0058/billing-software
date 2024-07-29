const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
// Connect to MongoDB
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());
dotenv.config();
const productRoute = require("./products/productRoute");
const adminRoute = require("./Admin/adminRoutes");
const managerRoute = require("./manager/managerRoute");

port = process.env.PORT;
url = process.env.DB_URL;

app.listen(port, (err) => {
  if (!err) {
    console.log(`Server running on port ${port}`);
  } else {
    console.log("Error in server connection");
  }
});

mongoose
  .connect(url)
  .then(console.log("Server connected"))
  .catch((err) => {
    console.log(err);
  });

app.use("/products", productRoute);
app.use("/Admin", adminRoute);
app.use("/manager", managerRoute);
