const Product = require('../models/product.js');

exports.getProducts = (req, res, next) => {
  Product.fethAll((products) => {
    res.render('shop/product-list', {
      prods: products,
      docTitle: 'shop',
      path: '/products',
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', { docTitle: 'Your cart', path: '/cart' });
};
exports.getOrders = (req, res, next) => {
  res.render('shop/orders', { docTitle: 'Your orders', path: '/orders' });
};
exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', { docTitle: 'Checkout', path: '/checkout' });
};
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    res.render('shop/product-detail', {
      docTitle: 'Product Info - ' + prodId,
      path: '/products',
      product: product,
    });
    console.log(product);
  });
};
exports.getHome = (req, res, next) => {
  Product.fethAll((products) => {
    res.render('shop/index', {
      docTitle: 'Welcome on bookshop',
      path: '/',
      prods: products,
    });
  });
};
