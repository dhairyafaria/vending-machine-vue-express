const db = require("../db/products");

exports.getAllProducts = async (req, res) => {
  const products = await db.getAllProducts();
  res.status(200).json({ products });
};