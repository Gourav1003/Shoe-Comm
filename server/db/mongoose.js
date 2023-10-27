const mongoose = require("mongoose");

const uri = "mongodb+srv://gsharma:1234567890@cluster0.mxrgp8r.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(uri)
  .then((client) => {
    console.log("connected sucessfully");
  })
  .catch((err) => {
    console.log(err);
  });