const Product = require('../models/product.js');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    docTitle: 'Add product',
    path: '/admin/add-product',
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  Product.create({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description,
  })
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        docTitle: 'Edit product ',
        path: '/admin/edit-product',
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const id = req.body.id;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  Product.findByPk(id)
    .then((product) => {
      product.title = title;
      product.price = price;
      product.imageUrl = imageUrl;
      product.description = description;

      return product.save();
    })
    .then((result) => {
      console.log('product updated');
      res.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};

exports.getAdminProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('admin/products', {
        prods: products,
        docTitle: 'Manage products',
        path: '/admin/products',
      });
    })
    .catch((err) => console.log(err));
};
exports.postDeleteProducts = (req, res, next) => {
  const prodId = req.body.id;
  Product.deleteById(prodId);
  res.redirect('/admin/products');
};
