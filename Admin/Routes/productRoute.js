const express = require("express");
const router = express.Router();
const controller = require("../Controllers/productController");
const cors = require("cors");

let corsOptions = {
  origin: ["http://localhost:4000"],
};

router.post("/addproduct", cors(corsOptions), controller, addproducts);

router.get("/getproducts", cors(corsOptions), controller, getproducts);

router.put("/updateproduct/:id", cors(corsOptions), controller, updateproduct);

router.delete(
  "/deleteproduct/:id",
  cors(corsOptions),
  controller,
  deleteproduct
);
module.exports = router;
