const Purchase = require("./purchaseModel");

// Create a new purchase
exports.createPurchase = async (req, res) => {
  try {
    const { supplierName, purchaseDate, totalAmount } = req.body;

    // Ensure required fields are provided
    if (!supplierName || !purchaseDate || totalAmount === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Convert purchaseDate to a Date object
    const date = new Date(purchaseDate);

    // Ensure valid date
    if (isNaN(date.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    // Extract month and year from purchaseDate
    const month = date.toLocaleString("default", { month: "long" }); // E.g., 'August'
    const year = date.getFullYear();

    // Create and save the purchase
    const newPurchase = new Purchase({
      supplierName,
      purchaseDate,
      totalAmount,
      month,
      year,
    });

    await newPurchase.save();

    res.status(201).json(newPurchase);
  } catch (error) {
    console.error("Error creating purchase:", error);
    res.status(500).json({ message: "Error creating purchase", error });
  }
};

// Get all purchases
exports.getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find();
    res.status(200).json(purchases);
  } catch (error) {
    console.error("Error fetching purchases:", error);
    res.status(500).json({ message: "Error fetching purchases", error });
  }
};
// Get monthly purchase report
exports.getMonthlyPurchaseReport = async (req, res) => {
  try {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    endOfMonth.setHours(23, 59, 59, 999);

    const monthlyPurchases = await Purchase.aggregate([
      {
        $match: {
          purchaseDate: {
            $gte: startOfMonth,
            $lt: endOfMonth,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$totalAmount" },
          count: { $sum: 1 },
          purchases: { $push: "$$ROOT" },
        },
      },
    ]);

    res.status(200).json(monthlyPurchases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get yearly purchase report
exports.getYearlyPurchaseReport = async (req, res) => {
  try {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const endOfYear = new Date(today.getFullYear(), 11, 31);
    endOfYear.setHours(23, 59, 59, 999);

    const yearlyPurchases = await Purchase.aggregate([
      {
        $match: {
          purchaseDate: {
            $gte: startOfYear,
            $lt: endOfYear,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalPurchases: { $sum: "$totalAmount" }, // Sum of total amounts spent on purchases
          purchaseCount: { $sum: 1 }, // Count the number of purchases
          purchases: { $push: "$$ROOT" }, // Include all the purchase documents in the result
        },
      },
    ]);

    res.status(200).json(yearlyPurchases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
