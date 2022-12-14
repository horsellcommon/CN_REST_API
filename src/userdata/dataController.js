const Data = require("./dataModel");
const User = require("../user/userModel");

exports.createData = async (request, response) => {
  try {
    const newData = await Data.create(request.body);
    response.status(201).send({ data: newData });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
};

exports.readData = async (request, response) => {
  try {
    const info = await Data.find({});
    const userdata = await User.find({});
    if (userdata && info) {
      response.status(200).send({ data: info, userdata });
    } else {
      response.status(500).send({ error: "Could not get." });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
};

exports.readSpecificData = async (request, response) => {
  try {
    const info = await Data.findOne({ username: request.params.username });
    const userdata = await User.findOne({ username: request.params.username });
    if (userdata && info) {
      response.status(200).send({ data: info, userdata });
    } else {
      response.status(500).send({ error: "Could not get." });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
};

exports.updateData = async (request, response) => {
  try {
    await Data.updateOne(
      { username: request.body.username },
      { [request.body.key]: request.body.value }
    );
    response.status(201).send({ message: "Record successfully updated." });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
};

exports.deleteData = async (request, response) => {
  try {
    await Data.deleteOne({ username: request.params.username });
    response.status(200).send({ message: "Data successfully deleted." });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
};
