const Product = require('../models/product.js');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    docTitle: 'Create new product',
    path: '/admin/add-product',
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    docTitle: 'Edit product',
    path: '/admin/edit-product',
  });
};
exports.getAdminProducts = (req, res, next) => {
  Product.fethAll((products) => {
    res.render('admin/products', {
      prods: products,
      docTitle: 'Manage products',
      path: '/admin/products',
    });
  });
};
