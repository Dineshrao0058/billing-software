const express = require("express");
const router = express.Router();
const purchaseController = require("./purchaseController");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:5000",
};
router.use(cors(corsOptions));

router.post("/purchases", cors(corsOptions), purchaseController.createPurchase);

router.get("/purchases", cors(corsOptions), purchaseController.getPurchases);

router.get(
  "/purchases/:month/:year",
  cors(corsOptions),
  purchaseController.getPurchasesByMonthYear
);

module.exports = router;
