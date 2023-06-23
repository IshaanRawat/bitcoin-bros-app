import { connectToDb, getDb } from "@/utils/db";
import {
  connectDiscord,
  createEmbed,
  sendNewMessageEmbed,
} from "@/utils/discord";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import config from "./../../../config.json";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDb();
  await connectDiscord();
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
      user = { _id: result.insertedId, walletAddress, discordMessageId: null };
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error looking up user" });
  }

  try {
    if (user.discordMessageId == null) {
      const messageEmbed = createEmbed(
        walletAddress,
        user.twitterUser?.username,
        user?.isFollowing
      );
      const discordMessageId = await sendNewMessageEmbed(messageEmbed);
      const db = getDb();
      await db.collection("users").updateOne(
        { walletAddress },
        {
          $set: {
            discordMessageId,
          },
        }
      );
    }
  } catch (error) {
    console.log("[DISCORD ERROR]", error);
  }

  const token = jwt.sign(
    { userId: user._id.toString(), walletAddress: user.walletAddress },
    config.JWT_SECRET,
    {
      expiresIn: "72h",
    }
  );

  res.status(200).json({ token });
};

export default handler;
