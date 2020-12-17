import dotenv from "dotenv";
import express from "express";
import { connect } from "./lib/database";
import { errorHandler } from "./lib/middlewares";
import routes from "./lib/routes";
import { ensureUniqueIdIndex } from "./lib/shorties";
import { initializeWebPush } from "./lib/subscriptions";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(routes);
app.use(errorHandler);

async function run() {
  const {
    MONGO_DB_URI,
    MONGO_DB_NAME,
    VAPID_SUBJECT,
    VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY,
  } = process.env;
  if (
    !MONGO_DB_URI ||
    !MONGO_DB_NAME ||
    !VAPID_SUBJECT ||
    !VAPID_PUBLIC_KEY ||
    !VAPID_PRIVATE_KEY
  ) {
    throw new Error(
      `Environment variables MONGO_DB_NAME, MONGO_DB_NAME, VAPID_SUBJECT, VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY are required`
    );
  }
  console.log("Connecting to database...");
  await connect(MONGO_DB_URI, MONGO_DB_NAME);
  console.log("Connected to database 🎉");
  await ensureUniqueIdIndex();
  initializeWebPush(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
  console.log("WebPush initialized 🤖");

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

run();
