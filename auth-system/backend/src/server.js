require("dotenv").config();

const app = require("./app");
const connectToDB = require("./config/db");

async function createSever() {
  try {
    await connectToDB();

    app.listen(process.env.PORT, () =>
      console.log("server running on port", process.env.PORT),
    );
  } catch (err) {
    console.log("error", err.message);
  }
}

createSever();
