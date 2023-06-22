import { Db, MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import config from "./../../config.json";

let db: Db;

export async function connectToDb() {
  if (db) return;
  const client = new MongoClient(config.MONGO_URL);
  await client.connect();
  db = client.db(process.env.DB_NAME);
}

export function getDb() {
  return db;
}

export default async function withDB(
  req: NextApiRequest,
  res: NextApiResponse,
  next: Function
) {
  await connectToDb();
  next();
}
