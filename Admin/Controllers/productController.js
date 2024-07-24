const products = require("../Models/productModel");

exports.addproduct = async (req, res) => {
  try {
    const newProduct = new products(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getproducts = async (req, res) => {
    try {
        const products = await products.find();
        res.json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateproduct = async (req, res) => {
    try {
        const updatedProduct = await products.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteproduct = async (req, res) => {  
  try {
    const deletedProduct = await products.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};