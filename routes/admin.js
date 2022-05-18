const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products");

router.get("/add-products", productsController.getAddProduct);

router.post("/product", productsController.postAddProduct);

module.exports = router;
