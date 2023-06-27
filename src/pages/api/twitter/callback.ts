// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToDb, getDb } from "@/utils/db";
import {
  connectDiscord,
  createEmbed,
  editMessageEmbed,
  sendNewMessage,
  sendNewMessageEmbed,
} from "@/utils/discord";
import { isRateLimitError } from "@/utils/twitter";
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
  await connectDiscord();
  await connectToDb();

  // Extract state and code from query string
  const { state, code } = req.query;

  let user: GeneralObject | null;
  try {
    const db = getDb();
    user = await db.collection("users").findOne({ walletAddress: state });

    if (!user) {
      return res.status(500).json({ error: "Error looking up user" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error looking up user" });
  }

  // Get the saved codeVerifier from session
  const { twitterCodeVerifier: codeVerifier } = user;

  console.log(codeVerifier, state, code);

  if (!codeVerifier || !state || !code) {
    return res.status(400).send("You denied the app or your session expired!");
  }

  client
    .loginWithOAuth2({
      code: `${code}`,
      codeVerifier,
      redirectUri: config.TWITTER_AUTH_CALLBACK_URL,
    })
    .then(
      async ({
        client: loggedClient,
        accessToken,
        refreshToken,
        expiresIn,
      }) => {
        try {
          const { data: userObject } = await loggedClient.v2.me();
          const db = getDb();
          let discordMessageId;
          try {
            if (user) {
              const messageEmbed = createEmbed(
                user.walletAddress,
                userObject.username,
                user.isFollowing
              );
              if (user.discordMessageId == null) {
                discordMessageId = await sendNewMessageEmbed(messageEmbed);
              } else {
                discordMessageId = user.discordMessageId;
                await editMessageEmbed(discordMessageId, messageEmbed);
              }
            }
          } catch (error) {
            console.log("[DISCORD ERROR]", error);
          }

          await db.collection("users").updateOne(
            { walletAddress: state },
            {
              $set: {
                discordMessageId,
                twitterUser: userObject,
                twitterTokens: {
                  accessToken,
                  refreshToken,
                  expiresIn,
                },
              },
            }
          );
          const token = jwt.sign(
            {
              userId: user?._id.toString(),
              walletAddress: user?.walletAddress,
            },
            config.JWT_SECRET,
            {
              expiresIn: "24h",
            }
          );
          return res.redirect(`/?token=${token}`);
        } catch (err) {
          if (isRateLimitError(err)) {
            sendNewMessage("Rate limit exceeded while callback!");
            return res.status(429).send("Rate limit exceeded!");
          }
          console.error(err);
          return res.status(500).json({ error: "Error updating user" });
        }
      }
    )
    .catch(() => res.status(403).send("Invalid verifier or access tokens!"));
}
