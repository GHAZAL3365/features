require("dotenv").config();
const express = require("express");
const app = express();

const connectToDB = require("./config/db")

async function createSever() {
  await connectToDB();

  app.listen(process.env.PORT, () =>
    console.log("server running on port", process.env.PORT),
  );
}

createSever();
