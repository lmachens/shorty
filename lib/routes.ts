import express from "express";
import fs from "fs";
import path from "path";
import { NewShorty } from "../types/shorties";
import { DUPLICATE_KEY } from "./database";
import {
  insertShorty,
  findShorty,
  updateShorty,
  findShorties,
} from "./shorties";
import { broadcastMessage, insertSubscription } from "./subscriptions";

const router = express.Router();

router.get("/api/vapid", (req, res) => {
  res.json({
    publicKey: process.env.VAPID_PUBLIC_KEY,
  });
});

router.post("/api/subscriptions", async (req, res, next) => {
  try {
    const subscription = req.body;
    console.log("New subscription");
    await insertSubscription(subscription);
    res.status(201).json(`Subscription ${subscription.endpointURL} added`);
  } catch (error) {
    next(error);
  }
});

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
    const shorty: NewShorty = req.body;
    await insertShorty(shorty);
    res.status(201).json(`Shorty ${shorty.id} inserted`);
    await broadcastMessage(`Shorty ${shorty.id} inserted`);
  } catch (error) {
    next(error);
  }
});

// Serve any static files
router.use(express.static(path.join(__dirname, "../client")));
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
  try {
    const indexFile = path.join(__dirname, "../client/index.html");
    fs.accessSync(indexFile);
    res.sendFile(indexFile);
  } catch (error) {
    res.status(404).send("Static files are not available in Development");
  }
});

export default router;
