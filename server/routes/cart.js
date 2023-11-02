const express = require("express");

const Cart = require("../models/cart");
const Product = require("../models/product");
const auth = require("../auth/user");
const router = express.Router();

router.use(auth);

router.post("/products", async (req, res) => {

  let cart;

  // console.log(req.body);

  cart = await Cart.findOne({ userId: req.id });
  if (!cart) {
    let cartstatus = {
      items: {
        product: req.body.productId,
        quantity: 1,
      },
      userId: req.id,
    };
    // console.log(cartstatus);
    cart = new Cart(cartstatus);
    await cart.save();
    res.status(200).send({ msg: "Item added to cart" });
  } else {
    console.log(cart);

    const existingItem = cart.items.find(
      (item) => item.product == req.body.productId
    );
    if (existingItem) {
      existingItem.quantity++;
    } else {

      cart.items.push({ product: req.body.productId, quantity: 1 });
    }
    await Cart.updateOne({ userId: req.id }, { $set: cart });
    res.status(200).send({ msg: "Item added to cart" });
  }
});

router.get("/", async (req, res) => {
  try {
    const userId = req.id;
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.product",
      select: "title price image_url",
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post("/products/delete", async (req, res) => {
  const { itemId } = req.body;

  const cart = await Cart.findOne({ userId: req.id });

  const items = cart.items.filter((item) => item.product != itemId);

  await Cart.updateOne({ userId: req.id }, { $set: { items: items } });
  res.status(200).send({ msg: "Deleted Successfully." });
});
module.exports = router;