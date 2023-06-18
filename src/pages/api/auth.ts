// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToDb, getDb } from "@/utils/db";
import jwt from "jsonwebtoken";

import type { NextApiRequest, NextApiResponse } from "next";
import config from "./../../../config.json";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDb();
  const { walletAddress } = req.body;

  let user;
  try {
    const db = getDb();
    user = await db.collection("users").findOne({ walletAddress });

    if (!user) {
      const result = await db.collection("users").insertOne({
        walletAddress,
        isWhitelisted: false,
        isFollowing: false,
        isWhitelistPostShared: false,
      });
      user = { _id: result.insertedId, walletAddress };
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error looking up user" });
  }

  const token = jwt.sign(
    { userId: user._id.toString(), walletAddress: user.walletAddress },
    config.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );

  res.status(200).json({ token });
};

export default handler;
