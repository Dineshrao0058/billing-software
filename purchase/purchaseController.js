const Purchase = require('./purchaseModel');

// Create a new purchase
exports.createPurchase = async (req,res) => {
    try {
        const purchase = new Purchase(req.body);
        await purchase.save();
        res.status(201).json(purchase);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Get all purchases
exports.getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find();
    res.status(200).json(purchases);
  } catch (error) {
    console.error('Error fetching purchases:', error);
    res.status(500).json({ message: 'Error fetching purchases', error });
  }
};

// Additional method to get purchases by month and year
exports.getPurchasesByMonthYear = async (req, res) => {
  try {
    const { month, year } = req.params;

    const purchases = await Purchase.find({ month, year });
    res.status(200).json(purchases);
  } catch (error) {
    console.error('Error fetching purchases by month and year:', error);
    res.status(500).json({ message: 'Error fetching purchases by month and year', error });
  }
};
