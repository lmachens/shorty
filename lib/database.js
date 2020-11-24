const { MongoClient } = require("mongodb");

let client;
let db;
async function connect(url, dbName) {
  // Use connect method to connect to the Server
  client = await MongoClient.connect(url, { useUnifiedTopology: true });
  db = client.db(dbName);
}

function close() {
  return client.close();
}

function collection(name) {
  return db.collection(name);
}

const DUPLICATE_KEY = 11000;

exports.connect = connect;
exports.close = close;
exports.collection = collection;
exports.DUPLICATE_KEY = DUPLICATE_KEY;
