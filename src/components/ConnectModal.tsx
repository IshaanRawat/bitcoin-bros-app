/* eslint-disable @next/next/no-img-element */
import { Space_Grotesk } from "next/font/google";
import React from "react";
import { createPortal } from "react-dom";
import { WalletName } from "../..";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

interface ConnectModalProps {
  connectWallet: (walletName: WalletName) => void;
  close: () => void;
}

const ConnectModal: React.FC<ConnectModalProps> = ({
  connectWallet,
  close,
}) => {
  return createPortal(
    <div
      className={`fixed z-40 top-0 left-0 p-4 w-full h-full flex items-center justify-center text-zinc-100 ${spaceGrotesk.className}`}
    >
      <div
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"
        onClick={close}
      ></div>
      <div className="bg-zinc-900 relative p-4 lg:p-8 rounded-md">
        <h2 className="text-2xl font-bold">Connect Wallet</h2>
        <p className="text-gray-500 mt-2">
          Connect your wallet to start your Bitcoin Bros journey.
        </p>
        <div className="flex flex-col mt-4 lg:mt-8 space-y-2 lg:space-y-4">
          <button
            onClick={connectWallet.bind(null, "Xverse")}
            disabled={typeof window.BitcoinProvider === "undefined"}
            className="w-full flex items-center justify-start p-4 border border-zinc-500 space-x-4 hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <img
              src="https://assets.website-files.com/624b08d53d7ac60ccfc11d8d/64637a04ad4e523a3e07675c_32x32.png"
              alt="xverse"
              className="w-6 h-6 rounded-full"
            />
            <div className="flex flex-col items-start">
              <span>Xverse</span>
              {typeof window.BitcoinProvider !== "undefined" ? (
                <span className="text-xs font-semibold uppercase text-green-400">
                  Installed
                </span>
              ) : (
                <span className="text-xs font-semibold uppercase text-zinc-500">
                  Not Installed
                </span>
              )}
            </div>
          </button>
          <button
            onClick={connectWallet.bind(null, "Hiro")}
            disabled={
              !(
                typeof window.HiroWalletProvider !== "undefined" &&
                typeof window.btc !== "undefined"
              ) || true
            }
            className="w-full flex items-center justify-start p-4 border border-zinc-500 space-x-4 hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <img
              src="https://assets.website-files.com/62cd53cfaed4257f165f6576/632b19335916e41bfcd20268_favicon-32x32.png"
              alt="hiro"
              className="w-6 h-6 rounded-full"
            />
            <div className="flex flex-col items-start">
              <span>Hiro</span>
              {typeof window.HiroWalletProvider !== "undefined" &&
              typeof window.btc !== "undefined" ? (
                <span className="text-xs font-semibold uppercase text-red-400">
                  Not Supported
                </span>
              ) : (
                <span className="text-xs font-semibold uppercase text-zinc-500">
                  Not Installed
                </span>
              )}
            </div>
          </button>
          <button
            onClick={connectWallet.bind(null, "UniSat")}
            disabled={typeof window.unisat === "undefined"}
            className="w-full flex items-center justify-start p-4 border border-zinc-500 space-x-4 hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <img
              src="https://unisat.io/logo/color.svg"
              alt="unisat"
              className="w-6 h-6 rounded-full"
            />
            <div className="flex flex-col items-start">
              <span>UniSat</span>
              {typeof window.unisat !== "undefined" ? (
                <span className="text-xs font-semibold uppercase text-green-400">
                  Installed
                </span>
              ) : (
                <span className="text-xs font-semibold uppercase text-zinc-500">
                  Not Installed
                </span>
              )}
            </div>
          </button>
        </div>
        {typeof window.unisat === "undefined" &&
        typeof window.btc === "undefined" &&
        typeof window.BitcoinProvider === "undefined" &&
        typeof window.HiroWalletProvider === "undefined" ? (
          <p className="text-red-500 mt-4 lg:mt-8">
            Please install at least one wallet to continue.
          </p>
        ) : null}
      </div>
    </div>,
    document.body
  );
};

export default ConnectModal;
