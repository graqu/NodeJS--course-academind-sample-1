const Product = require('../models/product.js');

exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    docTitle: 'Create new product',
    path: '/admin/add-product',
    activeAddProduct: true,
    formsCSS: true,
    productCSS: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  Product.fethAll((products) => {
    res.render('shop', {
      prods: products,
      docTitle: 'shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};
