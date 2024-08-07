const Product = require("./productModel");
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "productName",
    "productCategory",
    "productWeight",
    "productPrice",
    "productQuantity",
    "batchNumber",
    "manufacturingDate",
    "expirationDate",
    "description",
    "productStatus",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ message: "Invalid updates!" });
  }
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    updates.forEach(
      (update) => (product[update] = req.body[update] || product[update])
    );
    if (!product.productStatus) {
      product.productStatus = "active";
    }
    await product.save();
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send({ error: error.message });
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

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
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
exports.searchProducts = async (req, res) => {
  try {
    const { keyword, category } = req.query;

    if (!keyword && !category) {
      return res
        .status(400)
        .json({ message: "Keyword or category is required" });
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
