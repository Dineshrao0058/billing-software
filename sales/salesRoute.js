const express = require("express");
const router = express.Router();
const salesController = require("./salesController");

router.post("/createsales", salesController.createSale);
router.get("/getsales", salesController.getAllSales);
router.get("/salesreport/daily", salesController.getDailySalesReport);
router.get("/salesreport/monthly", salesController.getMonthlySalesReport);
router.get("/salesreport/yearly", salesController.getYearlySalesReport);
router.get("/salesreport/date", salesController.getSalesReportByDate);

module.exports = router;
