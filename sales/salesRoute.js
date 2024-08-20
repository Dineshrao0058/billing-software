const express = require("express");
const router = express.Router();
const salesController = require("./salesController");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:5000",
};
router.use(cors(corsOptions));
router.post("/createsales", cors(corsOptions), salesController.createSale);
router.get("/getsales", cors(corsOptions), salesController.getAllSales);
router.get(
  "/salesreport/daily",
  cors(corsOptions),
  salesController.getDailySalesReport
);
router.get(
  "/salesreport/monthly",
  cors(corsOptions),
  salesController.getMonthlySalesReport
);
router.get(
  "/salesreport/yearly",
  cors(corsOptions),
  salesController.getYearlySalesReport
);
router.get(
  "/salesreport/date",
  cors(corsOptions),
  salesController.getSalesReportByDate
);

module.exports = router;
