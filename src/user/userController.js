const User = require("./userModel");
const jwt = require("jsonwebtoken");

exports.createUser = async (request, response) => {
  try {
    const newUser = await User.create(request.body);
    const token = await jwt.sign({ _id: newUser.id }, process.env.SECRET_KEY);
    response.status(201).send({ username: newUser.username, token });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
};

exports.loginUser = async (request, response) => {
  try {
    if (request.user) {
      response.status(200).send({ username: request.user.username });
    } else {
      const user = await User.findByCredentials(
        request.body.username,
        request.body.password
      );
      const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
      response
        .status(200)
        .send({
          username: user.username,
          token,
          text: "Successfully logged in.",
        });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
};

exports.readUsers = async (request, response) => {
  try {
    const users = await User.find({});
    response.status(200).send({ user: users });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
};

exports.updateUser = async (request, response) => {
  try {
    await User.updateOne(
      { username: request.body.username },
      { [request.body.key]: request.body.value }
    );
    response.status(201).send({ message: "Successfully updated record." });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
};

exports.deleteUser = async (request, response) => {
  try {
    await User.deleteOne({ username: request.body.username });
    response.status(200).send({ message: "User successfully deleted." });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
};
