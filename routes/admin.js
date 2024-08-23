const express = require('express');
const path = require('path');
const productsControler = require('../contollers/products.js');

const router = express.Router();

router.get('/add-product', productsControler.getAddProduct);
router.post('/add-product', productsControler.postAddProduct);

module.exports = router;
