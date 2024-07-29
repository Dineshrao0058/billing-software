const express = require("express");
const router = express.Router();
const controller = require("../Controllers/productController");
const cors = require("cors");

let corsOptions = {
  origin: ["http://localhost:5000"],
};

// router.post("/createProduct", corsOptions, controller.createProduct);

 // router.put("/updateProduct/:id", corsOptions, controller.updateProduct);

router.post("/addproduct", cors(corsOptions), controller.addproduct);

router.get("/getproducts", cors(corsOptions), controller.getproducts);

router.put("/updateproduct/:id", cors(corsOptions), controller.updateproduct);

router.delete("/deleteproduct", cors(corsOptions), controller.deleteproduct);

module.exports = router;
