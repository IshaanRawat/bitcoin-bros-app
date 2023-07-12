import config from "@/data/config.json";
import {
  useTwitter,
  useUser,
  useWalletAuthentication,
  useWeb3,
  useWhitelist,
} from "@/hooks";
import { Check } from "@/icons";
import { formatAddress } from "@/utils/auth";
import mutations from "@/utils/mutations";
import { isValidObject } from "@/utils/object";
import queries from "@/utils/queries";
import { convertStringKebabToTitle, isValidString } from "@/utils/string";
import Image from "next/image";
import React, { useEffect, useMemo } from "react";
import { useMutation, useQuery } from "react-query";

interface PhallusMintProps {
  setMinted: React.Dispatch<React.SetStateAction<boolean>>;
}

const PhallusMint: React.FC<PhallusMintProps> = ({ setMinted }) => {
  const { openConnectModal } = useWalletAuthentication();
  const { createTransaction } = useWeb3();
  const { user } = useUser();
  const { connect } = useTwitter("PHALLUS");
  const { twitterProfile } = useWhitelist("PHALLUS");

  const { mutate } = useMutation(mutations.PHALLUS_MINT_INITIATE);
  const { data: phallus } = useQuery(["phallus"], queries.COLLECTION_PHALLUS, {
    enabled: true,
    select: (data) => data.data,
  });
  const { refetch: refetchMintStatus, data: mintStatus } = useQuery(
    ["phallus", "mint"],
    queries.PHALLUS_MINT_STATUS,
    {
      enabled: isValidObject(user),
      retry: false,
      select: (data) => data.data,
    }
  );

  const openTransaction = () => {
    window.open(
      `https://mempool.space/${
        config.BITCOIN_NETWORK === "Testnet" ? "testnet" : ""
      }/tx/${mintStatus.payment_transaction_id}`,
      "_blank"
    );
  };

  const mintProcess = useMemo(() => {
    if (isValidObject(mintStatus)) {
      if (
        ["inscription-revealed", "inscription-tweeted"].includes(
          mintStatus.status
        )
      ) {
        return "completed";
      } else {
        return "in-progress";
      }
    } else {
      return null;
    }
  }, [mintStatus]);

  useEffect(() => {
    if (mintProcess === "completed") {
      setMinted(true);
    } else {
      setMinted(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mintProcess]);

  const initiateMint = async () => {
    const transationHash = await createTransaction(
      config.PHALLUS_RECIPIENT_PAYMENT_ADDRESS,
      200,
      200
    );

    if (isValidString(transationHash)) {
      mutate(
        {
          payment_transaction_id: transationHash,
        },
        {
          onSuccess: (data) => {
            console.log(data);
            refetchMintStatus();
          },
        }
      );
    }
  };

  return (
    phallus &&
    (mintProcess != null ? (
      <div className="p-4 flex flex-col items-stretch">
        <div className="flex items-center justify-between">
          <span className="text-xl">
            {convertStringKebabToTitle(mintStatus.status)}
          </span>
          <div className="relative -left-4">
            <span className="bit-loader-white" />
          </div>
        </div>
        <div className="flex flex-col items-stretch">
          <button
            className="bg-zinc-100 w-full py-3 px-4 mt-4 flex items-center disabled:cursor-not-allowed disabled:opacity-50 space-x-4"
            onClick={openTransaction}
          >
            <Image
              src="https://static.cdn.zo.xyz/app-media/logos/bitcoin.svg"
              width={24}
              height={24}
              alt="bitcoin"
            />
            <span className="font-medium text-black">View Transaction</span>
          </button>
        </div>
      </div>
    ) : (
      <div className="p-4 flex flex-col items-stretch">
        <div className="flex items-center justify-between">
          <span className="text-xl">Free Mint</span>
          <span className="text-xl">
            {phallus.total_supply - phallus.supply_left}/{phallus.total_supply}
          </span>
        </div>
        <div className="mt-4 flex flex-col items-stretch space-y-1">
          {isValidObject(user) ? (
            <div className="py-3 px-4 flex bg-zinc-900 items-center justify-between">
              <div className="flex items-center space-x-4">
                <Image
                  src="https://static.cdn.zo.xyz/app-media/logos/bitcoin.svg"
                  width={24}
                  height={24}
                  alt="bitcoin"
                />
                <span className="font-medium text-zinc-50">
                  {formatAddress(user.wallet_address)}
                </span>
              </div>
              <Check />
            </div>
          ) : (
            <button
              className="bg-zinc-100 w-full py-3 px-4 flex items-center disabled:cursor-not-allowed disabled:opacity-50 space-x-4"
              onClick={openConnectModal}
            >
              <Image
                src="https://static.cdn.zo.xyz/app-media/logos/bitcoin.svg"
                width={24}
                height={24}
                alt="bitcoin"
              />
              <span className="font-medium text-black">
                Connect Bitcoin Ordinals Wallet
              </span>
            </button>
          )}
          {isValidObject(twitterProfile) ? (
            <div className="py-3 px-4 flex bg-zinc-900 items-center justify-between">
              <div className="flex items-center space-x-4">
                <Image
                  src="https://static.cdn.zo.xyz/app-media/logos/twitter-circle.svg"
                  width={24}
                  height={24}
                  alt="bitcoin"
                />
                <span className="font-medium text-zinc-50">
                  @{twitterProfile.username}
                </span>
              </div>
              <Check />
            </div>
          ) : (
            <button
              className="bg-zinc-100 w-full py-3 px-4 flex items-center disabled:cursor-not-allowed disabled:opacity-50 space-x-4"
              disabled={!isValidObject(user)}
              onClick={connect}
            >
              <Image
                src="https://static.cdn.zo.xyz/app-media/logos/twitter-circle.svg"
                width={24}
                height={24}
                alt="bitcoin"
              />
              <span className="font-medium text-black">Connect Twitter</span>
            </button>
          )}
          <button
            className="bg-zinc-100 w-full py-3 px-4 flex items-center disabled:cursor-not-allowed disabled:opacity-50 space-x-4"
            disabled={!isValidObject(twitterProfile)}
            onClick={initiateMint}
          >
            <Image
              src="https://static.cdn.zo.xyz/media/phallus.png"
              width={24}
              className="rounded-full"
              height={24}
              alt="bitcoin"
            />
            <span className="font-medium text-black">Mint Phallus</span>
          </button>
        </div>
      </div>
    ))
  );
};

export default PhallusMint;
