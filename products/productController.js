const Product = require("./productModel");

// Create a new product
exports.addProduct = async (req, res) => {
  try {
    const newProduct = new Product({
      ...req.body,
      productStatus: req.body.productStatus || "active", // Default to 'active' if not provided
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a product by ID

exports.updateProduct = async (req, res) => {
  try {
    // Find the product by ID and update with request body
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // `new: true` returns the updated document, `runValidators: true` ensures validation
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
