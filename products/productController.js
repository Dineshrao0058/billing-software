const Product = require("./productModel");

exports.createProduct = async (req, res) => {
  try {
    const productData = req.body;
    if (!productData.productStatus) { 
      productData.productStatus = "active";
    }
    const product = new Product(productData);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.updateProductById = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Recalculate prices if salePercentage or gstPercentage is updated
    if (req.body.salePercentage !== undefined || req.body.gstPercentage !== undefined) {
      updatedProduct.salePrice = updatedProduct.productPrice * (1 - updatedProduct.salePercentage / 100);
      updatedProduct.gstAmount = updatedProduct.salePrice * (updatedProduct.gstPercentage / 100);
      updatedProduct.totalPrice = updatedProduct.salePrice + updatedProduct.gstAmount;
      await updatedProduct.save();
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


// Search products by keyword or category
exports.searchProducts = async (req, res) => {
  try {
    const { keyword, category } = req.query;

    if (!keyword && !category) {
      return res.status(400).json({ message: "Keyword or category is required" });
    }


    const searchConditions = [];
    if (keyword) {
      const keywordRegex = new RegExp(keyword, "i");
      searchConditions.push({ productName: { $regex: keywordRegex } });
    }
    if (category) {
      const categoryRegex = new RegExp(category, "i");
      searchConditions.push({ productCategory: { $regex: categoryRegex } });
    }


    const products = await Product.find({ $or: searchConditions });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ error: error.message });
  }
};
