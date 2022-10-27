const { Router } = require("express");
const {
  createUser,
  readUsers,
  updateUser,
  deleteUser,
  loginUser,
} = require("./userController");
const { hashPass, tokenCheck, comparePasswords } = require("../middleware");

const userRouter = Router();

userRouter.post("/create", hashPass, createUser);
userRouter.post("/login", comparePasswords, tokenCheck, loginUser);
userRouter.get("/read", readUsers);
userRouter.put("/update", updateUser);
userRouter.delete("/delete/:username", deleteUser);

module.exports = userRouter;
