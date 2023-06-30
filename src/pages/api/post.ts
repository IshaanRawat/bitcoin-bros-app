// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import config from "@/data/config.json";
import tweets from "@/data/whitelist-tweets.json";
import { connectToDb, getDb } from "@/utils/db";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import { TwitterApi } from "twitter-api-v2";

import { connectDiscord, sendNewMessage } from "@/utils/discord";
import { isRateLimitError } from "@/utils/twitter";
import { GeneralObject } from "../../..";

// function to get tweet by id
function getTweet(id: string) {
  return tweets.find((t) => t.id === id);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body;

  const tweet = getTweet(id);

  if (!tweet) {
    return res.status(404).json({ error: "Tweet not found" });
  }

  await connectToDb();
  await connectDiscord();

  const { authorization } = req.headers;

  // get token from authorization header
  const token = authorization?.split(" ")[1];

  if (token === undefined) return res.status(401).send("Unauthorized");

  let decoded;
  try {
    decoded = jwt.verify(token, config.JWT_SECRET) as GeneralObject;
  } catch (error) {
    return res.status(401).send({ error: "Auth Token expired" });
  }

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
      await client.v2.reply(
        tweet.tweet,
        config.TWITTER_BITCOINBROS_WHITELIST_REPLY_TO
      );
    } catch (error) {
      console.log(error);
      if (isRateLimitError(error)) {
        sendNewMessage(
          `Rate limit exceeded while post from ${user.twitterUser.username}!`
        );
        return res.status(429).json({ error: "Rate limit error" });
      } else {
        return res.status(500).json({ error: "Error tweeting" });
      }
    }

    try {
      const db = getDb();
      await db.collection("users").updateOne(
        { walletAddress: decoded.walletAddress },
        {
          $set: {
            isWhitelistPostShared: true,
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
