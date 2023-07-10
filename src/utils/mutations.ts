import config from "@/data/config.json";
import axios from "axios";

const mutations = {
  AUTH_LOGIN: (data: any) =>
    axios.post(`${config.BASE_API_URL}/api/v1/auth/login/web3/`, data),
  WHITELIST: (data: any) =>
    axios.post(
      `${config.BASE_API_URL}/api/v1/webthree/ordinals/bitcoin-bros/whitelist/`,
      data
    ),
  TWITTER_OAUTH_VERIFY: (data: any) =>
    axios.post(
      `${config.BASE_API_URL}/api/v1/webthree/ordinals/bitcoin-bros/whitelist/twitter/oauth/verify/`,
      data
    ),
  CHALLENGES_TWITTER_CONNECT: (data: any) =>
    axios.post(
      `${config.BASE_API_URL}/api/v1/webthree/ordinals/bitcoin-bros/whitelist/challenges/twitter-connect/`,
      data
    ),
  CHALLENGES_TWITTER_FOLLOW: (data: any) =>
    axios.post(
      `${config.BASE_API_URL}/api/v1/webthree/ordinals/bitcoin-bros/whitelist/challenges/twitter-follow/`,
      data
    ),
  CHALLENGES_TWITTER_POST: (data: any) =>
    axios.post(
      `${config.BASE_API_URL}/api/v1/webthree/ordinals/bitcoin-bros/whitelist/challenges/twitter-post/`,
      data
    ),
  MINT_INITIATE: (data: any) =>
    axios.post(
      `${config.BASE_API_URL}/api/v1/webthree/ordinals/bitcoin-bros/mint/initiate/`,
      data
    ),
};

export default mutations;
