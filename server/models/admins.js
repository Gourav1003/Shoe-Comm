const validator = require("validator");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const { urlencoded } = require("express");

const adminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid!");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
    },
    employeeId: {
        type: String,
        required: true,
        minlength: 5,
        maxlength:5,
        trim: true,
    },
    // accessKey: {
    //     type: String,
    //     // required: true,
    //     minlength: 8,
    //     trim: true,
    //   },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

adminSchema.methods.getPublicProfile = function () {
  const admin = this;
  const adminObject = admin.toObject();
  delete adminObject.password;
  delete adminObject.tokens;

  return adminObject;
};
adminSchema.statics.findByCredentials = async (email, password) => {
  const admin = await User.findOne({ email });
  if (!admin) {
    throw new Error("UnaBle to find admin");
  }
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return admin;
};

adminSchema.methods.generateAuthToken = async function () {
  const admin = this;
  const token = jwt.sign({ _id: admin._id.toString() }, "thisismytoken",{
    expiresIn:"5h"
  });
  admin.tokens = admin.tokens.concat({ token });
  await admin.save();
  return token;
};

adminSchema.pre("save", async function (next) {
  const admin = this;

  if (admin.isModified("password")) {
    admin.password = await bcrypt.hash(admin.password, 8);
  }

  next();
});

const Admin = mongoose.model("User", adminSchema);

module.exports = Admin;