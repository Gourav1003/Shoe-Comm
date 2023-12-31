const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticate(req, res, next) {
  const headers = req.headers.authorization;
  const token = headers.split(" ")[1];

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY2);
    req.id = decoded._id;
    next();
  } catch (err) {
    return res.status(401).send("Unauthorized");
  }
}

module.exports = authenticate;