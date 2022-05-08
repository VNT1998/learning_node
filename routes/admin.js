const path = require("path");
const express = require("express");
const router = express.Router();
const rootDir = require("../utils/path");

const products = [];

router.get("/add-products", (req, res, next) => {
  console.log("This is another a middleware");
  res.render("add-product", {docTitle: "Add Product", path:"/admin/add-products"});
});

router.post("/product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

exports.routes = router;
exports.products = products;
