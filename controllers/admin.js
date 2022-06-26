const productModel = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    // console.log("This is another a middleware");
    res.render("admin/edit-product", {
        docTitle: "Add Product",
        path: "/admin/add-product",
        editing: false,
    });
};

exports.postAddProduct = (req, res, next) => {
    // const id =  Math.floor(Math.random() * 9999);
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new productModel(null, title, imageUrl, description, price);
    product.save().then(() => { res.redirect("/"); }).catch(err => { console.log(err) });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect("/");
    }
    const prodId = req.params.productId;
    productModel.findById(prodId, product => {
        if (!product) {
            return res.redirect("/");
        }
        res.render("admin/edit-product", {
            docTitle: "Edit Product",
            path: "/admin/edit-product",
            editing: editMode,
            product: product
        });
    });
};

exports.postEditProduct = (req, res, next) => {
    const id = req.body.id;
    productModel.findById(prodId, product => {
        if (!product) {
            return res.redirect("/admin/products");
        }

    });
    product.save();
    res.redirect("/admin/products");
};

exports.postDeleteProduct = (req, res, next) => {
    const id = req.body.id;
    productModel.deleteById(id);
    res.redirect("/admin/products");
};

exports.getProducts = (req, res, next) => {
    productModel.fetchAll().then(([rows, fieldData]) => {
        res.render("admin/products", {
            prods: rows,
            docTitle: "Admin Products",
            path: "/admin/products",
        });
    }).catch(err => { });
}