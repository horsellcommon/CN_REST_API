const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../user/userModel");

exports.hashPass = async (request, response, next) => {
  try {
    request.body.password = await bcrypt.hash(request.body.password, 15);
    next();
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
};
