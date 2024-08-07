const express = require("express");
const router = express.Router();
const controller = require("./productController");
const cors = require("cors");

let corsOptions = {
  origin: ["http://localhost:5000"],
};
router.post("/addproduct", cors(corsOptions), controller.createProduct);
router.get("/getproducts", cors(corsOptions), controller.getProducts);
router.put("/updateproduct/:id", cors(corsOptions), controller.updateProduct);
router.delete(
  "/deleteproduct/:id",
  cors(corsOptions),
  controller.deleteProduct
);
router.get("/search", cors(corsOptions), controller.searchProducts);
router.get("/products/search", controller.searchProducts);

module.exports = router;
