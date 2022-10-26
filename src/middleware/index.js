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

exports.tokenCheck = async (request, response, next) => {
  try {
    const token = request.header("Authorization");
    const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decodedToken._id);
    request.user = user;
    console.log(user);
    next();
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
};

exports.comparePasswords = async (request, response, next) => {
  try {
    request.user = await User.findOne({ username: request.body.username });
    if (
      request.user &&
      (await bcrypt.compare(request.body.password, request.user.password))
    ) {
      next();
    } else {
      throw new Error("Incorrect userid or password...");
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
};
