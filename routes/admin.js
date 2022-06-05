const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");

router.get("/add-products", adminController.getAddProduct);

router.post("/add-products", adminController.postAddProduct);
router.get("/products", adminController.getProducts);


module.exports = router;
