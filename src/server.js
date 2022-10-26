require("./db/connection");
const express = require("express");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Success! Listening on port ${port}`);
});
