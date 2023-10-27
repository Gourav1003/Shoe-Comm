const express = require("express");

const Product = require("../models/product");

const router = express.Router();

router.get("/allProducts", async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).send(products);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/product/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const products = await Product.findOne({ _id: id });
    console.log(products);

    res.status(200).send(products);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;