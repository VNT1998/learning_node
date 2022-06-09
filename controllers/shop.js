const productModel = require('../models/product');
const cartModel = require('../models/cart');

exports.getProducts = (req, res, next) => {
  productModel.fetchAll(products => {
    res.render("shop/product-list", {
      prods: products,
      docTitle: "All Products",
      path: "/products",
    });
  });
};
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  productModel.findById(prodId, product => {
    res.render("shop/product-detail", {
      product: product,
      docTitle: product.title,
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  productModel.fetchAll(products => {
    res.render("shop/index", {
      prods: products,
      docTitle: "Shop",
      path: "/",
    });
  });
}

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    docTitle: "Your Cart",
    path: "/cart",
  });
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  productModel.findById(prodId, product => {
    cartModel.addProduct(prodId, product.price);
  });
  res.render("shop/cart", {
    docTitle: "Your Cart",
    path: "/cart",
  });
}

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    docTitle: "Your Orders",
    path: "/orders",
  });
}

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    docTitle: "Checkout",
    path: "/checkout",
  });
}