const product = require("./productModel");
exports.createProduct = async (req, res) => {
  try {
    const {
      productName,
      productCategory,
      productWeight,
      productPrice,
      productQuantity,
      batchNumber,
      manufacturingDate,
      expirationDate,
      description,
      productStatus,
    } = req.body;

    // Ensure productStatus is set correctly
    const product = new product({
      productName,
      productCategory,
      productWeight,
      productPrice,
      productQuantity,
      batchNumber,
      manufacturingDate,
      expirationDate,
      description,
      productStatus: productStatus || "active",
    });

    await product.save();
    res.status(201).send(product);
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
      product.productStatus = "active"; // Set default value if undefined or empty
    }

    await product.save();
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.addproduct = async (req, res) => {
  try {
    const newProduct = new product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getproducts = async (req, res) => {
  try {
    const products = await product.find();
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateproduct = async (req, res) => {
  try {
    const updatedProduct = await product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteproduct = async (req, res) => {
  try {
    const deletedProduct = await product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
