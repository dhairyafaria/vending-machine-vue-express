const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

// GET /feed/posts
router.get('', productsController.getAllProducts);

module.exports = router;