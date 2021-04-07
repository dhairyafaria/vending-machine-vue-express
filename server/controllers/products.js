const db = require('../db/products');

const getAllProducts = async (req, res) => {
  const products = await db.getAllProducts();
  res.status(200).json({ products });
};

const updateProduct = async (req, res) => {
  const product = req.body;
  const id = await db.updateProduct(req.params.id, product);
  if (id) {
    const purchase = {
      productId: id,
      price: product.price,
      quantity: 1,
      date: new Date().toUTCString(),
    };
    const purchaseId = await db.addPurchase(purchase);
    res.status(200).json({ purchaseId });
  } else {
    res.status(500).json({ error: 'There is error in purchase.' });
  }
};

module.exports = {
  getAllProducts,
  updateProduct,
};
