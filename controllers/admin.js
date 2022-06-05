const productModel = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    console.log("This is another a middleware");
    res.render("admin/add-product", {
        docTitle: "Add Product",
        path: "/admin/add-products",
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true,
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new productModel(title, imageUrl, description, price);
    product.save();
    res.redirect("/");
};

exports.getProducts= (req, res, next) => {
    productModel.fetchAll(products=>{
        res.render("admin/products", {
            prods: products,
            docTitle: "Admin Products",
            path: "/admin/products",
        });
    });
}