// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToDb, getDb } from "@/utils/db";
import { isRateLimitError } from "@/utils/twitter";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import { TwitterApi } from "twitter-api-v2";
import config from "./../../../config.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
      return res.status(500).json({ error: "Error looking up user" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error looking up user" });
  }

  const client = new TwitterApi(user.twitterTokens.accessToken);

  try {
    try {
      await client.v2.follow(
        user.twitterUser.id,
        config.TWITTER_BITCOINBROS_ID
      );
    } catch (error) {
      if (isRateLimitError(error)) {
        return res.status(429).json({ error: "Rate limit exceeded" });
      }
      return res.status(500).json({ error: "Error following @BitcoinBrosXYZ" });
    }

    try {
      const db = getDb();
      await db.collection("users").updateOne(
        { walletAddress: decoded.walletAddress },
        {
          $set: {
            isFollowing: true,
          },
        }
      );
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: "Error following @BitcoinBrosXYZ" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error updating user" });
  }
}
