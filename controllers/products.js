const productModel=require('../models/product');

exports.getAddProduct = (req, res, next) => {
  console.log("This is another a middleware");
  res.render("add-product", {
    docTitle: "Add Product",
    path: "/admin/add-products",
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new productModel(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  productModel.fetchAll(products=>{
    res.render("shop", {
      prods: products,
      docTitle: "Shop",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};
