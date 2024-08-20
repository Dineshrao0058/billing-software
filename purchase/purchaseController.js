const Purchase = require('./purchaseModel');

// Create a new purchase
exports.createPurchase = async (req, res) => {
  try {
    const { supplierName, purchaseDate, totalAmount } = req.body;

    // Ensure required fields are provided
    if (!supplierName || !purchaseDate || totalAmount === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create and save the purchase
    const newPurchase = new Purchase({
      supplierName,
      purchaseDate,
      totalAmount
    });

    await newPurchase.save();

    res.status(201).json(newPurchase);
  } catch (error) {
    console.error('Error creating purchase:', error);
    res.status(500).json({ message: 'Error creating purchase', error });
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
