import { FilterQuery, UpdateQuery } from "mongodb";
import { Shorty, NewShorty } from "../types/shorties";
import { collection } from "./database";

export const getShortiesCollection = () => collection<Shorty>("shorties");

export const ensureUniqueIdIndex = () =>
  getShortiesCollection().createIndexes([{ key: { id: 1 }, unique: true }]);
export const findShorties = (query: FilterQuery<Shorty> = {}) =>
  getShortiesCollection().find(query).toArray();
export const findShorty = (query: FilterQuery<Shorty>) =>
  getShortiesCollection().findOne(query);
export const insertShorty = (newShorty: NewShorty) =>
  getShortiesCollection().insertOne({
    createdAt: new Date(),
    views: 0,
    ...newShorty,
  });
export const updateShorty = (
  query: FilterQuery<Shorty>,
  update: UpdateQuery<Shorty>
) => getShortiesCollection().updateOne(query, update);
