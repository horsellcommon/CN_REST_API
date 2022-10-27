const { Router } = require("express");
const {
  createData,
  readData,
  updateData,
  deleteData,
} = require("./dataController");

const dataRouter = Router();

dataRouter.post("/createdob", createData);
dataRouter.get("/readdob", readData);
dataRouter.put("/updatedob", updateData);
dataRouter.delete("/delete/:dateofbirth", deleteData);

module.exports = dataRouter;
