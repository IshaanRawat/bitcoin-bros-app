import { createContext } from "react";

export const EMPTY = {
  address: {
    payment: "",
    ordinal: "",
  },
  isConnected: false,
  signMessage: async (message: string) => {
    return null;
  },
  setAddress: () => {},
  openConnectModal: () => {},
  disconnect: () => {},
  createTransaction: async (recipient: string, amount: number, fee: number) => {
    return "";
  },
};

interface Web3ContextInterface {
  address: {
    payment: string;
    ordinal: string;
  };
  isConnected: boolean;
  setAddress: React.Dispatch<
    React.SetStateAction<{
      payment: string;
      ordinal: string;
    }>
  >;
  signMessage: (message: string) => Promise<string | null>;
  openConnectModal: () => void;
  createTransaction: (
    recipient: string,
    amount: number,
    fee: number
  ) => Promise<string>;
  disconnect: () => void;
}

const Web3Context = createContext<Web3ContextInterface>(EMPTY);

export default Web3Context;
