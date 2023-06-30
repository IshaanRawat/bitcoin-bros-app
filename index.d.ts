import { HeadersDefaults } from "axios";

type WalletName = "Xverse" | "UniSat" | "Hiro";

type GeneralObject = { [key: string]: any };

type EmptyFunction = () => void;

type Tweet = {
  id: string;
  tweet: string;
  shareLink: string;
};

type User = {
  walletAddress: string;
};

interface BBAxiosHeader extends HeadersDefaults {
  "client-device-id"?: string;
  "client-device-secret"?: string;
  "client-key"?: string;
  Authorization?: string;
}

export type AuthUser = {
  id: string;
  pid: string;
  first_name: string;
  last_name: string;
  wallet_address: string;
  mobile_number: string;
  email_address: string;
  access_groups: string[];
  roles?: string[];
};
