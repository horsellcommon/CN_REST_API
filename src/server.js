require("./db/connection");
const userRouter = require("./user/userRouters");
const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

app.use(userRouter);
app.use(express.json());

app.listen(port, () => {
  console.log(`Success! Listening on port ${port}`);
});
