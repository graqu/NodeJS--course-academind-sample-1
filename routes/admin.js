const express = require('express');
const path = require('path');
const adminControlers = require('../contollers/admin.js');

const router = express.Router();

router.get('/add-product', adminControlers.getAddProduct);
router.post('/add-product', adminControlers.postAddProduct);
router.get('/edit-product', adminControlers.getEditProduct);
router.get('/products', adminControlers.getAdminProducts);

module.exports = router;
