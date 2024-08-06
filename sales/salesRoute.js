const express = require("express");
const router = express.Router();
const salesController = require("./salesController");

// Route to create a sale
router.post("/createsales", salesController.createSale);

// Route to get all sales
router.get("/getsales", salesController.getAllSales);

// Route to get daily sales report
router.get("/salesreport/daily", salesController.getDailySalesReport);

// Route to get monthly sales report
router.get("/salesreport/monthly", salesController.getMonthlySalesReport);

// Route to get yearly sales report
router.get("/salesreport/yearly", salesController.getYearlySalesReport);

// Route to get sales report by date (day, month, or year)
router.get("/salesreport/date", salesController.getSalesReportByDate);

module.exports = router;
