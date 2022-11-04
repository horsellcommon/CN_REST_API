const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../user/userModel");

exports.hashPass = async (request, response, next) => {
  try {
    request.body.password = await bcrypt.hash(request.body.password, 16);
    next();
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
};

exports.tokenCheck = async (req, res, next) => {
  try {
    if (req.header("Authorization")) {
      const token = req.header("Authorization").replace("Bearer ", "");
      const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);
      console.log(decodedToken);
      const user = await User.findById(decodedToken._id);
      req.user = user;
      console.log(`Headers passed`);
    } else {
      console.log(`No headers passed`);
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
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
      throw new Error("Incorrect user id or password...");
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
};
