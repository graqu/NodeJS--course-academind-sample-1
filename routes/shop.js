const express = require('express');
const path = require('path');
const productsControler = require('../contollers/products.js');

const router = express.Router();

router.get('/', productsControler.getProducts);

module.exports = router;
