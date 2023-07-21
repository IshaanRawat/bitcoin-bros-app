import config from "@/data/config.json";
import { isValidString } from "@/utils/string";
import React, { useMemo } from "react";
import { GeneralObject } from "../..";
import Button from "./Button";
import StateInfo from "./StateInfo";

interface MintInfoProps {
  mintStatus: GeneralObject;
}

const MintInfo: React.FC<MintInfoProps> = ({ mintStatus }) => {
  const openTransaction = () => {
    if (
      mintStatus.status.startsWith("inscription") &&
      isValidString(mintStatus.reveal_transaction_id)
    ) {
      window.open(
        `https://mempool.space/${
          config.BITCOIN_NETWORK === "Testnet" ? "testnet" : ""
        }/tx/${mintStatus.reveal_transaction_id}`,
        "_blank"
      );
    } else {
      window.open(
        `https://mempool.space/${
          config.BITCOIN_NETWORK === "Testnet" ? "testnet" : ""
        }/tx/${mintStatus.payment_transaction_id}`,
        "_blank"
      );
    }
  };

  const paymentStatus = useMemo(
    () =>
      mintStatus.status === "payment-expired"
        ? "error"
        : mintStatus.status === "payment-initiated"
        ? "loading"
        : "completed",
    [mintStatus]
  );

  const inscriptionInitiatedStatus = useMemo(
    () =>
      mintStatus.status === "payment-confirmed"
        ? "loading"
        : mintStatus.status.startsWith("inscription")
        ? "completed"
        : "pending",
    [mintStatus]
  );

  const inscriptionCompletedStatus = useMemo(
    () =>
      mintStatus.status === "inscription-initiated"
        ? "loading"
        : mintStatus.status.startsWith("inscription")
        ? "completed"
        : "pending",
    [mintStatus]
  );

  return (
    <div>
      <h1 className="text-3xl lg:text-6xl font-bold">
        Get ready to hold your phallus ✊
      </h1>
      <div className="w-80 my-8">
        <Button
          imageSrc="https://static.cdn.zo.xyz/web-media/bitcoin-bros/bitcoin.svg"
          onClick={openTransaction}
        >
          Open Transaction
        </Button>
      </div>
      <p className="text-base lg:text-lg my-8">
        Don&apos;t worry! You phallus will come in no time 😉
      </p>
      <div className="flex flex-col space-y-4">
        <StateInfo state="completed">Payment Initiated</StateInfo>
        {paymentStatus === "error" ? (
          <StateInfo state="error">Payment Expired</StateInfo>
        ) : paymentStatus === "loading" ? (
          <StateInfo state="loading">
            Waiting for Payment Confirmation
          </StateInfo>
        ) : (
          <StateInfo state="completed">Payment Confirmed</StateInfo>
        )}
        {inscriptionInitiatedStatus === "loading" ? (
          <StateInfo state="loading">Inscription Initiating</StateInfo>
        ) : inscriptionInitiatedStatus === "completed" ? (
          <StateInfo state="completed">Inscription Initiated</StateInfo>
        ) : (
          <StateInfo state="pending">Inscription Initiation pending</StateInfo>
        )}
        {inscriptionCompletedStatus === "loading" ? (
          <StateInfo state="loading">Inscription Confirming</StateInfo>
        ) : inscriptionCompletedStatus === "completed" ? (
          <StateInfo state="completed">Inscription Confirmed</StateInfo>
        ) : (
          <StateInfo state="pending">
            Inscription Confirmation pending
          </StateInfo>
        )}
      </div>
    </div>
  );
};

export default MintInfo;
