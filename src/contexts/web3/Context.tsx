import { createContext } from "react";

export const EMPTY = {
  address: null,
  isConnected: false,
  signMessage: async (message: string) => {
    return null;
  },
  openConnectModal: () => {},
  disconnect: () => {},
};

interface Web3ContextInterface {
  address: string | null;
  isConnected: boolean;
  signMessage: (message: string) => Promise<string | null>;
  openConnectModal: () => void;
  disconnect: () => void;
}

const Web3Context = createContext<Web3ContextInterface>(EMPTY);

export default Web3Context;
