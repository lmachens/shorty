import dotenv from "dotenv";
import express from "express";
import { connect } from "./lib/database";
import { errorHandler } from "./lib/middlewares";
import routes from "./lib/routes";
import { ensureUniqueIdIndex } from "./lib/shorties";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(routes);
app.use(errorHandler);

async function run() {
  console.log("Connecting to database...");
  await connect(process.env.MONGO_DB_URI, process.env.MONGO_DB_NAME);
  console.log("Connected to database 🎉");
  await ensureUniqueIdIndex();

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

run();
