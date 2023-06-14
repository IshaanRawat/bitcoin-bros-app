import { connectToDb, getDb } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectToDb();
    const db = getDb();
    const usersCollection = db.collection("users");
    const usersCount = await usersCollection.countDocuments({});

    res.status(200).json({ message: "Database connected", usersCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error connecting to database" });
  }
};

export default handler;
