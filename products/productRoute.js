const express = require("express");
const router = express.Router();
const controller = require("./productController");
const cors = require("cors");

const corsOptions = {
  origin: ["http://localhost:5000", "http://localhost:4200"],
};

router.use(cors(corsOptions));

router.post("/addproduct", controller.createProduct);
router.get("/getproduct", controller.getProducts);
router.put("/updateproduct/:id", controller.updateProductById);
router.delete("/deleteproduct/:id", controller.deleteProduct);
router.get("/searchproduct", controller.searchProducts);

module.exports = router;
