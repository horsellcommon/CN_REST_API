const Data = require("../userdata/dataModel");

exports.createData = async (request, response) => {
  try {
    const newData = await Data.create(request.body);
    response.status(201).send({ data: newData });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
};
