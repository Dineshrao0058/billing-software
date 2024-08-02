const express = require("express");
const router = express.Router();
const controller = require("./productController");
const cors = require("cors");

let corsOptions = {
  origin: ["http://localhost:5000"],
};

// Existing routes for other CRUD operations...

router.post("/addproduct", cors(corsOptions), controller.addproduct);

router.get("/getproducts", cors(corsOptions), controller.getproducts);

router.put("/updateproduct/:id", cors(corsOptions), controller.updateproduct);

router.delete("/deleteproduct/:id", cors(corsOptions), controller.deleteproduct);

// New search route
router.get("/search", cors(corsOptions), controller.searchProducts);
module.exports = router;
