const Sale = require("./salesModel");
const Product = require("../products/productModel");

exports.createSale = async (req, res) => {
  try {
    const saleData = req.body;
    const sales = [];
    for (const sale of saleData) {
      const product = await Product.findById(sale.productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${sale.productId} not found` });
      }
      if (product.productQuantity < sale.saleQuantity) {
        return res
          .status(400)
          .json({
            message: `Insufficient quantity for product ID ${sale.productId}`,
          });
      }

      const newSale = new Sale({
        productId: sale.productId,
        saleQuantity: sale.saleQuantity,
        salePrice: sale.salePrice,
        customerName: sale.customerName,
        customerMobile: sale.customerMobile,
      });

      await newSale.save();

      product.productQuantity -= sale.saleQuantity;
      await product.save();

      sales.push(newSale);
    }

    res.status(201).json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate("productId");
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getDailySalesReport = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const dailySales = await Sale.aggregate([
      {
        $match: {
          saleDate: {
            $gte: today,
            $lt: tomorrow,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$salePrice" },
          totalQuantity: { $sum: "$saleQuantity" },
          sales: { $push: "$$ROOT" },
        },
      },
    ]);

    res.status(200).json(dailySales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getMonthlySalesReport = async (req, res) => {
  try {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    endOfMonth.setHours(23, 59, 59, 999);

    const monthlySales = await Sale.aggregate([
      {
        $match: {
          saleDate: {
            $gte: startOfMonth,
            $lt: endOfMonth,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$salePrice" },
          totalQuantity: { $sum: "$saleQuantity" },
          sales: { $push: "$$ROOT" },
        },
      },
    ]);

    res.status(200).json(monthlySales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getYearlySalesReport = async (req, res) => {
  try {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const endOfYear = new Date(today.getFullYear(), 11, 31);
    endOfYear.setHours(23, 59, 59, 999);

    const yearlySales = await Sale.aggregate([
      {
        $match: {
          saleDate: {
            $gte: startOfYear,
            $lt: endOfYear,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$salePrice" },
          totalQuantity: { $sum: "$saleQuantity" },
          sales: { $push: "$$ROOT" },
        },
      },
    ]);

    res.status(200).json(yearlySales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getSalesReportByDate = async (req, res) => {
  try {
    const { dateType, dateValue } = req.query;

    let start, end;

    if (dateType === "day") {
      start = new Date(dateValue);
      start.setHours(0, 0, 0, 0);
      end = new Date(dateValue);
      end.setHours(23, 59, 59, 999);
    } else if (dateType === "month") {
      const [year, month] = dateValue.split("-");
      start = new Date(year, month - 1, 1);
      end = new Date(year, month, 0);
      end.setHours(23, 59, 59, 999);
    } else if (dateType === "year") {
      start = new Date(dateValue, 0, 1);
      end = new Date(dateValue, 11, 31);
      end.setHours(23, 59, 59, 999);
    } else {
      return res.status(400).json({ message: "Invalid date type" });
    }

    const salesByDate = await Sale.aggregate([
      {
        $match: {
          saleDate: {
            $gte: start,
            $lt: end,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$salePrice" },
          totalQuantity: { $sum: "$saleQuantity" },
          sales: { $push: "$$ROOT" },
        },
      },
    ]);

    res.status(200).json(salesByDate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
