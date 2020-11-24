import { Db, MongoClient } from "mongodb";

let client: MongoClient;
let db: Db;
export async function connect(url: string, dbName: string) {
  // Use connect method to connect to the Server
  client = await MongoClient.connect(url, { useUnifiedTopology: true });
  db = client.db(dbName);
}

export function close() {
  return client.close();
}

export function collection<schema>(name: string) {
  return db.collection<schema>(name);
}

export const DUPLICATE_KEY = 11000;
