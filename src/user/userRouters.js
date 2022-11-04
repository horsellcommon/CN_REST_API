const { Router } = require("express");
const {
  createUser,
  readUsers,
  updateUser,
  deleteUser,
  loginUser,
} = require("./userController");
const { hashPass, tokenCheck } = require("../middleware");
// comparePasswords ^^

const userRouter = Router();

userRouter.post("/create", hashPass, createUser);
// comparePasswords, vv
userRouter.post("/login", tokenCheck, loginUser);
userRouter.get("/read", readUsers);
userRouter.put("/update", updateUser);
userRouter.delete("/delete", deleteUser);

module.exports = userRouter;
