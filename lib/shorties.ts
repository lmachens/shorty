import { collection } from "./database";

export const getShortiesCollection = () => collection("shorties");

export const ensureUniqueIdIndex = () =>
  getShortiesCollection().createIndexes({ id: 1 }, { unique: true });
export const findShorties = (query = {}) =>
  getShortiesCollection().find(query).toArray();
export const findShorty = (query) => getShortiesCollection().findOne(query);
export const insertShorty = (shorty) =>
  getShortiesCollection().insertOne({
    createdAt: new Date(),
    views: 0,
    ...shorty,
  });
export const updateShorty = (query, update) =>
  getShortiesCollection().updateOne(query, update);
