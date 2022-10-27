require("./db/connection");
const userRouter = require("./user/userRouters");
const express = require("express");
const dataRouter = require("./userdata/dataRouters");

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(userRouter, dataRouter);

app.listen(port, () => {
  console.log(`Success! Listening on port ${port}`);
});
