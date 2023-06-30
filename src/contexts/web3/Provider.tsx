import { ConnectModal } from "@/components";
import React, { useMemo, useState } from "react";
import { getAddress, signMessage as signSatsMessage } from "sats-connect";
import { WalletName } from "../../..";
import Web3Context from "./Context";

interface Web3ProviderProps {
  children: React.ReactNode;
}

const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [address, setAddress] = useState<{
    payment: string;
    ordinal: string;
  }>({
    payment: "",
    ordinal: "",
  });
  const [connectedWallet, setConnectedWallet] = useState<WalletName | null>(
    null
  );
  const [isConnectModalVisible, setConnectModalVisible] =
    useState<boolean>(false);

  const isConnected = useMemo(() => {
    return address.payment !== "";
  }, [address]);

  const signMessage = async (message: string) => {
    if (connectedWallet === "UniSat") {
      let res = await window.unisat.signMessage(message);
      console.log("signMessage", res);
      return res;
    } else if (connectedWallet === "Hiro") {
      const response = await window.btc.request("signMessage", {
        message,
        paymentType: "p2wpkh",
      });
      console.log("signMessage", response.result.signature);
      return response.result.signature;
    } else if (connectedWallet === "Xverse") {
      return new Promise((resolve) => {
        const signMessageOptions: any = {
          payload: {
            network: {
              type: "Mainnet",
            },
            address: address.payment,
            message,
          },
          onFinish: (response: any) => {
            console.log("signMessage", response);
            return resolve(response);
          },
          onCancel: () => {
            return resolve(null);
          },
        };
        return signSatsMessage(signMessageOptions);
      });
    }
  };

  const openConnectModal = () => {
    setConnectModalVisible(true);
  };

  const connectWallet = async (walletName: WalletName) => {
    if (walletName === "UniSat") {
      if (typeof window.unisat !== "undefined") {
        console.log("UniSat Wallet is installed!");
        try {
          const accounts = await window.unisat.requestAccounts();
          console.log("connect success", accounts);
          setAddress({
            payment: accounts[0],
            ordinal: "",
          });
          setConnectedWallet(walletName);
          setConnectModalVisible(false);
        } catch (e) {
          console.log("connect failed");
        }
      } else {
        alert("UniSat Wallet is not installed!");
      }
    } else if (walletName === "Hiro") {
      if (
        typeof window.HiroWalletProvider !== "undefined" &&
        typeof window.btc !== "undefined"
      ) {
        console.log("Hiro Wallet is installed!");
        try {
          const userAddresses = await window.btc.request("getAddresses");
          const ordinalAddress = userAddresses.result.addresses.find(
            (address: any) => address.type === "p2tr"
          ).address;
          const paymentAddress = userAddresses.result.addresses.find(
            (address: any) => address.type === "p2wpkh"
          ).address;
          console.log("connect success", userAddresses);
          setAddress({
            payment: paymentAddress,
            ordinal: ordinalAddress,
          });
          setConnectedWallet(walletName);
          setConnectModalVisible(false);
        } catch (e) {
          console.log("connect failed", e);
        }
      } else {
        alert("Hiro Wallet is not installed!");
      }
    } else if (walletName === "Xverse") {
      if (typeof window.BitcoinProvider !== "undefined") {
        console.log("Xverse Wallet is installed!");
        try {
          const getAddressOptions: any = {
            payload: {
              purposes: ["ordinals", "payment"],
              message: "Address for receiving Ordinals and payments",
              network: {
                type: "Mainnet",
              },
            },
            onFinish: (response: any) => {
              const ordinalAddress = response.addresses.find(
                (a: any) => a.purpose === "ordinals"
              ).address;
              const paymentAddress = response.addresses.find(
                (a: any) => a.purpose === "payment"
              ).address;
              console.log("connect success", response);
              setAddress({
                payment: paymentAddress,
                ordinal: ordinalAddress,
              });
              setConnectedWallet(walletName);
              setConnectModalVisible(false);
            },
            onCancel: () => alert("Request canceled"),
          };

          await getAddress(getAddressOptions);
        } catch (e) {
          console.log("connect failed", e);
        }
      } else {
        alert("Xverse Wallet is not installed!");
      }
    }
  };

  const disconnect = () => {
    setAddress({
      payment: "",
      ordinal: "",
    });
    setConnectedWallet(null);
  };

  return (
    <Web3Context.Provider
      value={{
        address,
        isConnected,
        signMessage,
        openConnectModal,
        disconnect,
      }}
    >
      {children}
      {isConnectModalVisible && (
        <ConnectModal
          connectWallet={connectWallet}
          close={setConnectModalVisible.bind(null, false)}
        />
      )}
    </Web3Context.Provider>
  );
};

export default Web3Provider;

declare global {
  interface Window {
    unisat: any;
    btc: any;
    HiroWalletProvider: any;
  }
}
