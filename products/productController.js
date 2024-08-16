const Product = require('./productModel');

// Create a new product
exports.createProduct = async (req, res) => {
  try {const Product = require('./productModel');

    // Create a new product
    exports.createProduct = async (req, res) => {
      try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    };
    
    // Update a product by ID
    exports.updateProduct = async (req, res) => {
      const updates = Object.keys(req.body);
      const allowedUpdates = [
        "productName",
        "productCategory",
        "productWeight",
        "productUnit",
        "productPrice",
        "productQuantity",
        "batchNumber",
        "manufacturingDate",
        "purchaseDate",
        "expirationDate",
        "description",
        "productStatus",
        "salePercentage",
        "gstPercentage"
      ];
      
      const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
      );
    
      if (!isValidOperation) {
        return res.status(400).json({ message: "Invalid updates!" });
      }
    
      try {
        const product = await Product.findById(req.params.id);
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }
    
        updates.forEach(
          (update) => (product[update] = req.body[update])
        );
    
        await product.save();
        res.status(200).json(product);
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
    
    // Update product by ID (alternative method)
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
          const keywordRegex = new RegExp(keyword, "i"); // case-insensitive search
          searchConditions.push({ productName: { $regex: keywordRegex } });
        }
        if (category) {
          const categoryRegex = new RegExp(category, "i"); // case-insensitive search
          searchConditions.push({ productCategory: { $regex: categoryRegex } });
        }
    
        const products = await Product.find({ $or: searchConditions });
    
        res.status(200).json(products);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    };
    
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "productName",
    "productCategory",
    "productWeight",
    "productUnit",
    "productPrice",
    "productQuantity",
    "batchNumber",
    "manufacturingDate",
    "purchaseDate",
    "expirationDate",
    "description",
    "productStatus",
    "salePercentage",
    "gstPercentage"
  ];
  
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ message: "Invalid updates!" });
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    updates.forEach(
      (update) => (product[update] = req.body[update] || product[update])
    );

    // Recalculate prices if salePercentage or gstPercentage is updated
    if (req.body.salePercentage !== undefined || req.body.gstPercentage !== undefined) {
      product.salePrice = product.productPrice * (1 - product.salePercentage / 100);
      product.gstAmount = product.salePrice * (product.gstPercentage / 100);
      product.totalPrice = product.salePrice + product.gstAmount;
    }

    await product.save();
    res.status(200).json(product);
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

// Update product by ID (alternative method)
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
      const keywordRegex = new RegExp(keyword, "i"); // case-insensitive search
      searchConditions.push({ productName: { $regex: keywordRegex } });
    }
    if (category) {
      const categoryRegex = new RegExp(category, "i"); // case-insensitive search
      searchConditions.push({ productCategory: { $regex: categoryRegex } });
    }

    const products = await Product.find({ $or: searchConditions });

    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
