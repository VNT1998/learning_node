const fs = require("fs");
const path = require("path");
const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "cart.json"
);

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
}