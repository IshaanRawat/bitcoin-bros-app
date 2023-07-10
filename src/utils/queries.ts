import config from "@/data/config.json";
import axios from "axios";

const queries = {
  PROFILE_ME: () => axios.get(`${config.BASE_API_URL}/api/v1/profile/me/`),
  BROS_WHITELIST: () =>
    axios.get(
      `${config.BASE_API_URL}/api/v1/webthree/ordinals/bitcoin-bros/whitelist/`
    ),
  BROS_TWITTER_AUTH_REQUEST: () =>
    axios.get(
      `${config.BASE_API_URL}/api/v1/webthree/ordinals/bitcoin-bros/whitelist/twitter/oauth/request/`
    ),
  PHALLUS_WHITELIST: () =>
    axios.get(
      `${config.BASE_API_URL}/api/v1/webthree/ordinals/bitcoin-phallus/whitelist/`
    ),
  PHALLUS_TWITTER_AUTH_REQUEST: () =>
    axios.get(
      `${config.BASE_API_URL}/api/v1/webthree/ordinals/bitcoin-phallus/whitelist/twitter/oauth/request/`
    ),
  PHALLUS_MINT_STATUS: () =>
    axios.get(
      `${config.BASE_API_URL}/api/v1/webthree/ordinals/bitcoin-phallus/mint/status/`
    ),
};

export default queries;
