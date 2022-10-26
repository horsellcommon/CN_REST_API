require("dotenv").config();
const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection successful...");
  } catch (error) {
    console.log(`Could not connect...` + error);
  }
};

connectToDatabase();
