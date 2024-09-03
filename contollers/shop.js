const Product = require('../models/product.js');
const Cart = require('../models/cart.js');

exports.getProducts = (req, res, next) => {
  Product.fethAll()
    .then(([rows, fileData]) => {
      res.render('shop/product-list', {
        prods: rows,
        docTitle: 'shop',
        path: '/products',
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  Cart.getProducts((cart) => {
    Product.fethAll((products) => {
      const cartProducts = [];
      for (let product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id,
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        docTitle: 'Your cart',
        path: '/cart',
        products: cartProducts,
        total: cart.totalPrice,
      });
    });
  });
};
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, Number(product.price));
  });
  res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.prodId;
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
  });
  res.redirect('/cart');
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', { docTitle: 'Your orders', path: '/orders' });
};
exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', { docTitle: 'Checkout', path: '/checkout' });
};
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId).then(([product]) => {
    res.render('shop/product-detail', {
      docTitle: 'Product Info - ' + prodId,
      path: '/products',
      product: product[0],
    });
    console.log(product);
  });
};
exports.getHome = (req, res, next) => {
  Product.fethAll()
    .then(([rows, filedData]) => {
      res.render('shop/index', {
        docTitle: 'Welcome on bookshop',
        path: '/',
        prods: rows,
      });
    })
    .catch((err) => console.log(err));
};
