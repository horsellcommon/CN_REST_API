const Data = require("../userdata/dataModel"); // Import user for lines 15/16?

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
    const info = await Data.find({}); // if username matches User then return both Data/User objects
    response.status(200).send({ data: info });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
};

exports.updateData = async (request, response) => {
  try {
    await Data.updateOne(
      { username: request.body.username }, // Might not work???
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
    await Data.deleteOne({ dateofbirth: request.params.dateofbirth });
    response.status(200).send({ message: "Data successfully deleted." });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
};
