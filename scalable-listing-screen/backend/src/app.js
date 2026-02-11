const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const seedData = require("../src/seedingItems")

const { getList } = require("../src/controller/listing.controller");

mongoose.connect("mongodb://localhost:27017/test-data");

seedData()
const app = express();

// adding fack data to db to test the api




app.use(express.json());

app.get("/api/get-list", getList);

app.listen(2000, () => console.log("server running is port number 2000"));
