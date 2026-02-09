
const express = require("express");
const router = express.Router()

const {getList}  = require("../src/controller/listing.controller")

const app = express();

app.use(express.json());

app.get("/api/get-list", getList)

app.listen(2000, () => console.log("server running is port number 2000"))