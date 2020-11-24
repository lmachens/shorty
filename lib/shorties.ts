import { FilterQuery, UpdateQuery } from "mongodb";
import { collection } from "./database";

interface Shorty {
  createdAt: Date;
  views: number;
  id: string;
  target: string;
}

export const getShortiesCollection = () => collection<Shorty>("shorties");

export const ensureUniqueIdIndex = () =>
  getShortiesCollection().createIndexes([{ key: { id: 1 }, unique: true }]);
export const findShorties = (query: FilterQuery<Shorty> = {}) =>
  getShortiesCollection().find(query).toArray();
export const findShorty = (query: FilterQuery<Shorty>) =>
  getShortiesCollection().findOne(query);
export const insertShorty = ({
  id,
  target,
}: Omit<Shorty, "createdAt" | "views">) =>
  getShortiesCollection().insertOne({
    createdAt: new Date(),
    views: 0,
    id,
    target,
  });
export const updateShorty = (
  query: FilterQuery<Shorty>,
  update: UpdateQuery<Shorty>
) => getShortiesCollection().updateOne(query, update);
