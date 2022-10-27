const Data = require("./dataModel"); // Import user for lines 15/16?
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
    if (response.data.username == User.data.username) { // username Undefined
      response.status(200).send({ data: info, userdata });
    } else {
      console.log("Unable to find, showing only date of birth data.");
      response.status(200).send({ data: info });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
};

exports.updateData = async (request, response) => {
  try {
    await Data.updateOne(
      { username: request.body.username }, // Might not work???
      { [request.body.key]: request.body.value } // Doesnt work lol
    );
    response.status(201).send({ message: "Record successfully updated." });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
};

exports.deleteData = async (request, response) => {
  // Also doesn't work?
  try {
    await Data.deleteOne({ dateofbirth: request.params.dateofbirth });
    response.status(200).send({ message: "Data successfully deleted." });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
};
