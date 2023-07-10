import config from "@/data/config.json";
import axios from "axios";

const mutations = {
  AUTH_LOGIN: (data: any) =>
    axios.post(`${config.BASE_API_URL}/api/v1/auth/login/web3/`, data),
  BROS_WHITELIST: (data: any) =>
    axios.post(
      `${config.BASE_API_URL}/api/v1/webthree/ordinals/bitcoin-bros/whitelist/`,
      data
    ),
  BROS_TWITTER_OAUTH_VERIFY: (data: any) =>
    axios.post(
      `${config.BASE_API_URL}/api/v1/webthree/ordinals/bitcoin-bros/whitelist/twitter/oauth/verify/`,
      data
    ),
  BROS_CHALLENGES_TWITTER_CONNECT: (data: any) =>
    axios.post(
      `${config.BASE_API_URL}/api/v1/webthree/ordinals/bitcoin-bros/whitelist/challenges/twitter-connect/`,
      data
    ),
  BROS_CHALLENGES_TWITTER_FOLLOW: (data: any) =>
    axios.post(
      `${config.BASE_API_URL}/api/v1/webthree/ordinals/bitcoin-bros/whitelist/challenges/twitter-follow/`,
      data
    ),
  BROS_CHALLENGES_TWITTER_POST: (data: any) =>
    axios.post(
      `${config.BASE_API_URL}/api/v1/webthree/ordinals/bitcoin-bros/whitelist/challenges/twitter-post/`,
      data
    ),
  PHALLUS_WHITELIST: (data: any) =>
    axios.post(
      `${config.BASE_API_URL}/api/v1/webthree/ordinals/bitcoin-phallus/whitelist/`,
      data
    ),
  PHALLUS_TWITTER_OAUTH_VERIFY: (data: any) =>
    axios.post(
      `${config.BASE_API_URL}/api/v1/webthree/ordinals/bitcoin-phallus/whitelist/twitter/oauth/verify/`,
      data
    ),
  PHALLUS_CHALLENGES_TWITTER_CONNECT: (data: any) =>
    axios.post(
      `${config.BASE_API_URL}/api/v1/webthree/ordinals/bitcoin-phallus/whitelist/challenges/twitter-connect/`,
      data
    ),
  PHALLUS_MINT_INITIATE: (data: any) =>
    axios.post(
      `${config.BASE_API_URL}/api/v1/webthree/ordinals/bitcoin-phallus/mint/initiate/`,
      data
    ),
};

export default mutations;
