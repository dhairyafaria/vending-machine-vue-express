const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

// GET /products
router.get('', productsController.getAllProducts);
router.patch('/update/:id', productsController.updateProduct);

module.exports = router;
