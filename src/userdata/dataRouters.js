const { Router } = require("express");
const {
  createData,
  readData,
  updateData,
  deleteData,
  readSpecificData,
} = require("./dataController");

const dataRouter = Router();

dataRouter.post("/createdob", createData);
dataRouter.get("/readdob", readData);
dataRouter.get("/readspecifics/:username", readSpecificData);
dataRouter.put("/updatedob", updateData);
dataRouter.delete("/deletedob/:username", deleteData);

module.exports = dataRouter;
