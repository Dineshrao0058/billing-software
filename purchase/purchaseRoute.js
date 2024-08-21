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

// Route to get monthly purchase report
router.get(
  "/purchases/report/monthly",
  cors(corsOptions),
  purchaseController.getMonthlyPurchaseReport
);

// Route to get yearly purchase report
router.get(
  "/purchases/report/yearly",
  cors(corsOptions),
  purchaseController.getYearlyPurchaseReport
);
router.get(
  "/searchpurchase",
  cors(corsOptions),
  purchaseController.searchPurchases
);

module.exports = router;
