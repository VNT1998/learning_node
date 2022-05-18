const products = [];

exports.getAddProduct = (req, res, next) => {
  console.log("This is another a middleware");
  res.render("add-product", {
    docTitle: "Add Product",
    path: "/admin/add-products",
  });
};

exports.postAddProduct = (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  res.render("shop", {
    prods: products,
    docTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  });
};
