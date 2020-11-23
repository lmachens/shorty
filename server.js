require("dotenv").config();
const express = require("express");
const { connect } = require("./lib/database");
const routes = require("./lib/routes");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(routes);

async function run() {
  console.log("Connecting to database...");
  await connect(process.env.MONGO_DB_URI, process.env.MONGO_DB_NAME);
  console.log("Connected to database 🎉");

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

run();
