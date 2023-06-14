// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToDb, getDb } from "@/utils/db";
import jwt from "jsonwebtoken";

import type { NextApiRequest, NextApiResponse } from "next";
import config from "../../../config.json";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDb();
  const { authorization } = req.headers;

  // get token from authorization header
  const token = authorization?.split(" ")[1];

  if (token === undefined) return res.status(401).send("Unauthorized");

  // decode token
  const decoded = jwt.verify(token, config.JWT_SECRET) as GeneralObject;

  let user;
  try {
    const db = getDb();
    user = await db
      .collection("users")
      .findOne({ walletAddress: decoded.walletAddress });

    if (!user) {
      return res.status(404).json({ error: "No User" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error looking up user" });
  }

  res.status(200).json({
    walletAddress: user.walletAddress,
    twitterUser: user.twitterUser,
    isWhitelisted: user.isWhitelisted,
    isFollowing: user.isFollowing,
    isWhitelistPostShared: user.isWhitelistPostShared,
  });
};

export default handler;
