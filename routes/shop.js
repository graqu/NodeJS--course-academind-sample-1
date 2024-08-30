const express = require('express');
const path = require('path');
const productsControler = require('../contollers/shop.js');

const router = express.Router();

router.get('/', productsControler.getHome);
router.get('/products', productsControler.getProducts);
router.get('/products/:productId', productsControler.getProduct);
router.get('/cart', productsControler.getCart);
router.post('/cart', productsControler.postCart);
router.post('/cart-delete-item', productsControler.postCartDeleteProduct);
router.get('/orders', productsControler.getOrders);
router.get('/checkout', productsControler.getCheckout);

module.exports = router;
