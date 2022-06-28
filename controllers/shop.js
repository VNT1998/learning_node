const productModel = require('../models/product');
const cartModel = require('../models/cart');
const cartProducts = [];

exports.getProducts = (req, res, next) => {
  productModel.findAll().then((products) => {
    res.render("shop/product-list", {
      prods: products,
      docTitle: "All Products",
      path: "/products",
    });
  }).catch(err => { });
};
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // productModel.findByPk(prodId).then((product) => {
    productModel.findAll({where: {id: prodId}}).then((product) => { 
    console.log(product);
    res.render("shop/product-detail", {
      product: product[0],
      docTitle: product[0].title,
      // product: product,
      // docTitle: product.title,
      path: "/products",
    });
  }).catch(err => { console.log(err) });
};

exports.getIndex = (req, res, next) => {
  productModel.findAll().then((products) => {
    res.render("shop/index", {
      prods: products,
      docTitle: "Shop",
      path: "/",
    });
  }).catch(err => { });
}

exports.getCart = (req, res, next) => {
  cartModel.fetchAll(cart => {
    productModel.fetchAll(products => {
      for (pro of products) {
        const product = pro;
        if (cart.products.find(prod => prod.id === product.id)) {
          cartProducts.push({
            productData: product,
            quantity: cart.products.find(prod => prod.id === product.id).quantity
          });
        };
      }
      res.render("shop/cart", {
        docTitle: "Your Cart",
        path: "/cart",
        products: cartProducts
      });
    });
  });
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  productModel.findById(prodId, product => {
    cartModel.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  productModel.findById(prodId, product => {
    cartModel.deleteProduct(prodId, product.price, false);
    res.redirect('/cart');
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