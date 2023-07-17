import { ConnectModal } from "@/components";
import config from "@/data/config.json";
import { isPaymentAddress } from "@/utils/auth";
import { getPSBT } from "@/utils/web3";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  SignTransactionOptions,
  getAddress,
  signMessage as signSatsMessage,
  signTransaction,
} from "sats-connect";
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
  const [paymentPublicKey, setPaymentPublicKey] = useState<string>("");
  const [connectedWallet, setConnectedWallet] = useState<WalletName | null>(
    null
  );
  const [isConnectModalVisible, setConnectModalVisible] =
    useState<boolean>(false);

  const isUnisatOnboarding = useRef<boolean>(false);

  const isConnected = useMemo(() => {
    return address.payment !== "" && address.ordinal !== "";
  }, [address]);

  useEffect(() => {
    const localPaymentAddress = localStorage.getItem("bb-p");
    const localOrdinalAddress = localStorage.getItem("bb-o");
    const localPublicKey = localStorage.getItem("bb-pk");
    const connectedWallet = localStorage.getItem("bb-wallet");

    if (
      localPaymentAddress &&
      localOrdinalAddress &&
      localPublicKey &&
      connectedWallet
    ) {
      setAddress({
        payment: localPaymentAddress,
        ordinal: localOrdinalAddress,
      });
      setPaymentPublicKey(localPublicKey);
      setConnectedWallet(connectedWallet as WalletName);
    }
  }, []);

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
              type: config.BITCOIN_NETWORK,
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

  const connectWallet = useCallback(
    async (walletName: WalletName) => {
      if (walletName === "UniSat") {
        if (typeof window.unisat !== "undefined") {
          isUnisatOnboarding.current = true;
          console.log("UniSat Wallet is installed!");
          try {
            const accounts = await window.unisat.requestAccounts();
            let publicKey = await window.unisat.getPublicKey();
            setPaymentPublicKey(publicKey);
            console.log("connect success", accounts);
            if (isPaymentAddress(accounts[0])) {
              if (address.ordinal !== "") {
                setAddress((a) => ({
                  payment: accounts[0],
                  ordinal: a.ordinal,
                }));
                setConnectedWallet(walletName);
                localStorage.setItem("bb-p", accounts[0]);
                localStorage.setItem("bb-o", address.ordinal);
                localStorage.setItem("bb-wallet", walletName);
                localStorage.setItem("bb-pk", publicKey);
                setConnectModalVisible(false);
                isUnisatOnboarding.current = false;
              } else {
                alert("Select Taproot Address from UniSat settings first.");
              }
            } else {
              setAddress((a) => ({
                payment: a.payment,
                ordinal: accounts[0],
              }));
              setConnectedWallet(walletName);
              alert("Select Nested Segwit Address from UniSat settings now.");
            }
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
                  type: config.BITCOIN_NETWORK,
                },
              },
              onFinish: (response: any) => {
                const ordinalAddress = response.addresses.find(
                  (a: any) => a.purpose === "ordinals"
                ).address;
                const paymentAddress = response.addresses.find(
                  (a: any) => a.purpose === "payment"
                );
                console.log("connect success", response);
                setAddress({
                  payment: paymentAddress.address,
                  ordinal: ordinalAddress,
                });
                setPaymentPublicKey(paymentAddress.publicKey);
                setConnectedWallet(walletName);

                localStorage.setItem("bb-p", paymentAddress.address);
                localStorage.setItem("bb-o", ordinalAddress);
                localStorage.setItem("bb-wallet", walletName);
                localStorage.setItem("bb-pk", paymentAddress.publicKey);
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
    },
    [address.ordinal]
  );

  const createTransaction = async (
    recipient: string,
    amount: number,
    fee: number
  ) => {
    if (connectedWallet === "Xverse") {
      return new Promise<string>(async (resolve) => {
        const psbt = await getPSBT(
          address.payment,
          paymentPublicKey,
          recipient,
          amount,
          fee
        );

        const signPsbtOptions: SignTransactionOptions = {
          payload: {
            network: {
              type: config.BITCOIN_NETWORK as "Mainnet" | "Testnet",
            },
            message: "Sign Transaction",
            psbtBase64: psbt.base64,
            broadcast: true,
            inputsToSign: [{ address: address.payment, signingIndexes: [0] }],
          },
          onFinish: (response) => {
            console.log(response);
            return resolve(response.txId);
          },

          onCancel: () => {
            console.log("canceled");
            return resolve("");
          },
        };

        return signTransaction(signPsbtOptions);
      });
    } else if (connectedWallet === "UniSat") {
      const psbt = await getPSBT(
        address.payment,
        paymentPublicKey,
        recipient,
        amount,
        fee
      );
      const signedPSBT = await window.unisat.signPsbt(psbt.hex);
      const txId = await window.unisat.pushPsbt(signedPSBT);
      return txId;
    } else {
      return "";
    }
  };

  const disconnect = () => {
    setAddress({
      payment: "",
      ordinal: "",
    });
    setConnectedWallet(null);
  };

  useEffect(() => {
    if (connectedWallet === "UniSat" && isUnisatOnboarding.current) {
      window.unisat.on("accountsChanged", (accounts: string[]) => {
        if (isUnisatOnboarding.current) {
          connectWallet("UniSat");
        }
      });
    }
  }, [connectWallet, connectedWallet]);

  return (
    <Web3Context.Provider
      value={{
        address,
        isConnected,
        signMessage,
        setAddress,
        createTransaction,
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
