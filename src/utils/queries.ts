import config from "@/data/config.json";
import axios from "axios";

const queries = {
  PROFILE_ME: () => axios.get(`${config.BASE_API_URL}/api/v1/profile/me/`),
  WHITELIST: () =>
    axios.get(
      `${config.BASE_API_URL}/api/v1/webthree/ordinals/bitcoin-bros/whitelist/`
    ),
  TWITTER_AUTH_REQUEST: () =>
    axios.get(
      `${config.BASE_API_URL}/api/v1/webthree/ordinals/bitcoin-bros/whitelist/twitter/oauth/request/`
    ),
  MINT_STATUS: () =>
    axios.get(
      `${config.BASE_API_URL}/api/v1/webthree/ordinals/bitcoin-bros/mint/status/`
    ),
};

export default queries;
