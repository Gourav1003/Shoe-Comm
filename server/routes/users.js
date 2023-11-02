const express = require("express");
const router = express.Router();

const User = require("../models/users");

router.post("/signup", async (req, res) => {
  
  // console.log(req.body);

  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user: user.getPublicProfile(), token });
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user: user.getPublicProfile(), token });
    console.log(user)
  } catch (e) {
    res.status(400).send({
      msg: e.message,
    });
  }
});
module.exports = router;