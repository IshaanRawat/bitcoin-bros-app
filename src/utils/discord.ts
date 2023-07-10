import config from "@/data/config.json";
import { Client, EmbedBuilder } from "discord.js";

let client: Client;
let userLogsChannel: any;

const connectDiscord = async () => {
  if (client && userLogsChannel) return;

  client = new Client({
    intents: [],
  });
  await client.login(config.DISCORD_BOT_SECRET);
  userLogsChannel = await client.channels.fetch(config.DISCORD_CHANNEL_ID);
};

const sendNewMessageEmbed = async (embed: EmbedBuilder) => {
  const discordMessage = await userLogsChannel.send({ embeds: [embed] });
  return discordMessage.id;
};

const sendNewMessage = async (message: string) => {
  const discordMessage = await userLogsChannel.send(message);
  return discordMessage.id;
};

const editMessageEmbed = async (id: string, embed: EmbedBuilder) => {
  const discordMessage = await userLogsChannel.messages.fetch(id);
  discordMessage.edit({ embeds: [embed] });
};

const createEmbed = (
  walletAddress: string,
  twitterUsername?: string,
  following?: boolean
) => {
  const fields = [];

  if (walletAddress) {
    fields.push({
      name: "Wallet Address",
      value: walletAddress,
    });
  }
  if (twitterUsername) {
    fields.push({
      name: "Twitter Connected",
      value: `https://www.twitter.com/${twitterUsername}`,
    });
  }
  if (following != null) {
    fields.push({
      name: "Following Bros?",
      value: following ? "Yes" : "No",
    });
  }

  const embed = new EmbedBuilder({
    title: "Bro Info",
    fields,
  }).setColor(
    walletAddress && twitterUsername && following
      ? "#cfff50"
      : walletAddress && twitterUsername
      ? "#156cc4"
      : "#999999"
  );

  return embed;
};

export {
  connectDiscord,
  createEmbed,
  editMessageEmbed,
  sendNewMessage,
  sendNewMessageEmbed,
};
