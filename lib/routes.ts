import express from "express";
import path from "path";
import { DUPLICATE_KEY } from "./database";
import {
  insertShorty,
  findShorty,
  updateShorty,
  findShorties,
} from "./shorties";

const router = express.Router();

router.get("/api/shorties", async (req, res, next) => {
  try {
    const shorties = await findShorties();
    res.json(shorties);
  } catch (error) {
    next(error);
  }
});

router.post("/api/shorties", async (req, res, next) => {
  try {
    const shorty = req.body;
    await insertShorty(shorty);
    res.status(201).json(`Shorty ${shorty.id} inserted`);
  } catch (error) {
    next(error);
  }
});

// Serve any static files
router.use(express.static(path.join(__dirname, "../client/build")));
router.use(
  "/storybook",
  express.static(path.join(__dirname, "../client/storybook-static"))
);

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const shorty = await findShorty({ id });
    if (!shorty) {
      return res.status(404).json(`Shorty ${id} not found`);
    }
    res.redirect(shorty.target);
    updateShorty({ id }, { $inc: { views: 1 } });
  } catch (error) {
    if (error.code === DUPLICATE_KEY) {
      res.status(409);
    }
    next(error);
  }
});

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

export default router;
