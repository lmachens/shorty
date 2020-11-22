require("dotenv").config();
const express = require("express");
const path = require("path");
const { connect } = require("./lib/database");
const {
  findShorty,
  insertShorty,
  findShorties,
  updateShorty,
} = require("./lib/shorties");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Serve any static files
app.use(express.static(path.join(__dirname, "client/build")));
app.use(
  "/storybook",
  express.static(path.join(__dirname, "client/storybook-static"))
);

app.get("/api/shorties", async (req, res) => {
  try {
    const shorties = await findShorties();
    res.json(shorties);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
});

app.post("/api/shorties", async (req, res) => {
  try {
    const shorty = req.body;
    await insertShorty(shorty);
    res.status(201).json(`Shorty ${shorty.id} inserted`);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
});

app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const shorty = await findShorty({ id });
    if (!shorty) {
      return res.status(404).json(`Shorty ${id} not found`);
    }
    res.redirect(shorty.target);
    console.log(`${id} requested`);
    updateShorty({ id }, { $inc: { views: 1 } });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

async function run() {
  console.log("Connecting to database...");
  await connect(process.env.MONGO_DB_URI, process.env.MONGO_DB_NAME);
  console.log("Connected to database 🎉");

  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

run();
