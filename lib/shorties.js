const { collection } = require("./database");

const getShortiesCollection = () => collection("shorties");

const ensureUniqueIdIndex = () =>
  getShortiesCollection().createIndexes({ id: 1 }, { unique: true });
const findShorties = (query = {}) =>
  getShortiesCollection().find(query).toArray();
const findShorty = (query) => getShortiesCollection().findOne(query);
const insertShorty = (shorty) =>
  getShortiesCollection().insertOne({
    createdAt: new Date(),
    views: 0,
    ...shorty,
  });
const updateShorty = (query, update) =>
  getShortiesCollection().updateOne(query, update);

exports.ensureUniqueIdIndex = ensureUniqueIdIndex;
exports.findShorties = findShorties;
exports.findShorty = findShorty;
exports.insertShorty = insertShorty;
exports.updateShorty = updateShorty;
