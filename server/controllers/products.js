const db = require('../db/products');

const getAllProducts = async (req, res) => {
  const products = await db.getAllProducts();
  res.status(200).json({ products });
};

const updateProduct = async (req, res) => {
  const id = await db.updateProduct(req.params.id, req.body);
  res.status(200).json({ id });
};

module.exports = {
  getAllProducts,
  updateProduct,
};
