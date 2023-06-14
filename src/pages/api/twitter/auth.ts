// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToDb, getDb } from "@/utils/db";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import { TwitterApi } from "twitter-api-v2";
import config from "./../../../../config.json";

const client = new TwitterApi({
  clientId: config.TWITTER_CLIENT_ID,
  clientSecret: config.TWITTER_CLIENT_SECRET,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDb();

  const { authorization } = req.headers;

  const token = authorization?.split(" ")[1];

  if (token === undefined) return res.status(401).send("Unauthorized");

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

  const { url, codeVerifier } = client.generateOAuth2AuthLink(
    config.TWITTER_AUTH_CALLBACK_URL,
    {
      scope: [
        "tweet.read",
        "users.read",
        "offline.access",
        "follows.write",
        "follows.read",
        "tweet.write",
      ],
      state: user.walletAddress,
    }
  );

  try {
    const db = getDb();
    await db.collection("users").updateOne(
      { walletAddress: decoded.walletAddress },
      {
        $set: {
          twitterCodeVerifier: codeVerifier,
        },
      }
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error updating user" });
  }

  return res.send({ url });
}
