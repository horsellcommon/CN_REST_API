require("./db/connection");
const userRouter = require("./user/userRouters");
const express = require("express");
const cors = require("cors");
const dataRouter = require("./userdata/dataRouters");

const app = express();
app.use(cors());

const port = process.env.PORT || 5001;

app.use(express.json());
app.use(userRouter, dataRouter);

app.get("/health", (req, res) => {
  res.status(200).send({ message: "API is working." });
});

app.listen(port, () => {
  console.log(`Success! Listening on port ${port}`);
});
