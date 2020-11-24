import { MongoClient } from "mongodb";

let client;
let db;
export async function connect(url, dbName) {
  // Use connect method to connect to the Server
  client = await MongoClient.connect(url, { useUnifiedTopology: true });
  db = client.db(dbName);
}

export function close() {
  return client.close();
}

export function collection(name) {
  return db.collection(name);
}

export const DUPLICATE_KEY = 11000;
