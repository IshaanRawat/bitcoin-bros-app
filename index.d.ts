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
