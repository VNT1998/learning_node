const fs = require("fs");
const path = require("path");
const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "cart.json"
);

getCartProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (!err) {
            console.log(JSON.parse(fileContent));
            cb(JSON.parse(fileContent));
        } else {
            console.log(err);
            cb(null);
        }
    });
}
module.exports = class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            const exsistingProductIndex = cart.products.findIndex(product => product.id === id);
            const exsistingProduct = cart.products[exsistingProductIndex];
            let updatedProduct;
            if (exsistingProduct) {
                updatedProduct = { ...exsistingProduct };
                updatedProduct.quantity++;
                cart.products = [...cart.products];
                cart.products[exsistingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, quantity: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = parseInt(cart.totalPrice) + parseInt(productPrice);
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
            })
        });
    }
    static deleteProduct(id, productPrice, isProductDeletedFromAdmin) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }
            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.products.find(product => product.id === id);
            const productIndex = updatedCart.products.findIndex(product => product.id === id);
            if (!product) {
                return;
            }
            const productQty = product.quantity;
            if (isProductDeletedFromAdmin) {
                updatedCart.products = updatedCart.products.filter(product => product.id !== id);
                updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
            } else {
                updatedCart.products = updatedCart.products.filter(product => product.id !== id);
                if (productQty > 1) {
                    product.quantity--;
                    updatedCart.products.splice(productIndex, 0, product);
                }
                updatedCart.totalPrice = updatedCart.totalPrice - productPrice;
            }
            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err);
            })
        });
    }
    static fetchAll(cb) {
        getCartProductsFromFile(cb);
    }
}