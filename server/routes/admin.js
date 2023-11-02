const express = require("express");
const router = express.Router();

const Product = require("../models/product");
const Admin = require("../models/admins");

router.post("/adminsignup", async(req,res)=>{

    // console.log(req.body);

    const admin = new Admin(req.body);
    try{
        await admin.save();
        const token = "Add Request Successful"
        res.status(201).send({admin:admin.getPublicProfile(),token});
    } catch(err){
        res.status(400).send(err);
        console.log(err);
    }
});

router.post("/adminlogin", async (req, res) => {
    try {
      const admin = await Admin.findByCredentials(
        req.body.email,
        req.body.password
      );
      const token = await admin.generateAuthToken();
      res.send({ user: admin.getPublicProfile(), token });
      // console.log(admin);
    } catch (e) {
      res.status(400).send({
        msg: e.message,
      });
    }
  });

  router.post("/addProduct", async (req, res) => {
    // console.log(req.body);
  
    // console.log(req.id)
    // console.log({ ...req.body })
    const product = new Product({ ...req.body });
    try {
      await product.save();
  
      res.status(201).send({ product });
    } catch (err) {
      res.status(400).send(err);
      console.log(err);
    }
  });

  router.post("/updateProduct/:id", async (req, res) => {
    const id = req.params.id
    const data = {
      ...req.body
    }
    // console.log(data)
    try {
      const result = await Product.updateOne({ _id: id }, { $set: data });
  
      res.status(201).send({ result });
    } catch (err) {
      res.status(400).send(err);
      console.log(err);
    }
  });
  
  router.delete("/deleteProduct/:id", async (req, res) => {
    const id = req.params.id
    try {
      const result = await Product.deleteOne({ _id: id })
  
      res.status(201).send({ result });
    } catch (err) {
      res.status(400).send(err);
      console.log(err);
    }
  });

  router.delete("/deleteAdmin/:id", async (req, res) => {
    const id = req.params.id
    try {
      const result = await Admin.deleteOne({ _id: id })
  
      res.status(201).send({ result });
    } catch (err) {
      res.status(400).send(err);
      console.log(err);
    }
  });
  
module.exports = router;