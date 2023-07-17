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
import React, { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";

interface PhallusMintProps {
  setMinted: React.Dispatch<React.SetStateAction<boolean>>;
  setImageLink: React.Dispatch<React.SetStateAction<string>>;
  hasMintStarted: boolean;
}

const PhallusMint: React.FC<PhallusMintProps> = ({
  setMinted,
  hasMintStarted,
  setImageLink,
}) => {
  const { openConnectModal } = useWalletAuthentication();
  const { createTransaction } = useWeb3();
  const { user } = useUser();
  const { connect } = useTwitter("PHALLUS");
  const { twitterProfile } = useWhitelist("PHALLUS");

  const [startFetching, setStartFetching] = useState<boolean>(false);

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
      refetchInterval: startFetching ? 5000 : false,
      select: (data) => data.data,
    }
  );

  const { data: utxos } = useQuery(
    ["phallus", "whitelist", "utxos"],
    queries.PHALLUS_WHITELIST_UTXOS,
    {
      enabled: isValidObject(user) && !isValidObject(mintStatus),
      retry: false,
      select: (data) => data.data,
    }
  );

  const hasBalance = useMemo(() => {
    if (isValidObject(utxos)) {
      const _utxos = utxos.results || [];
      // get the utxo with the highest value
      if (_utxos.length > 0) {
        const highestUtxo = _utxos.reduce((prev: any, current: any) =>
          prev.value > current.value ? prev : current
        );
        return (
          highestUtxo.value >=
          config.PHALLUS_MINT_PRICE + config.PHALLUS_MINT_FEE
        );
      } else {
        return false;
      }
    } else {
      return false;
    }
  }, [utxos]);

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
      setStartFetching(false);
      setMinted(true);
    } else {
      if (mintProcess === "in-progress") {
        setStartFetching(true);
      } else {
        setStartFetching(false);
      }
      setMinted(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mintProcess]);

  const initiateMint = async () => {
    const transationHash = await createTransaction(
      config.PHALLUS_RECIPIENT_PAYMENT_ADDRESS,
      config.PHALLUS_MINT_PRICE,
      config.PHALLUS_MINT_FEE
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

  useEffect(() => {
    if (mintStatus != null) {
      if (!isNaN(mintStatus?.sequence_id) && mintStatus?.sequence_id > 0) {
        setImageLink(
          `https://zo-nft.s3.ap-south-1.amazonaws.com/bros/phallus/${mintStatus.sequence_id}.svg`
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mintStatus]);

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
            className="bg-zinc-100 w-full py-2 px-3 2xl:py-3 2xl:px-4 mt-4 flex items-center disabled:cursor-not-allowed disabled:opacity-50 space-x-4"
            onClick={openTransaction}
          >
            <Image
              src="https://static.cdn.zo.xyz/app-media/logos/bitcoin.svg"
              width={24}
              height={24}
              alt="bitcoin"
            />
            <span className="font-medium text-black text-sm 2xl:text-base">
              View Transaction
            </span>
          </button>
        </div>
      </div>
    ) : phallus?.supply_left > 0 ? (
      <div className="p-4 flex flex-col items-stretch">
        <div className="flex items-center justify-between">
          <span className="text-xl">Free Mint</span>
          <span className="text-xl">
            {phallus.total_supply - phallus.supply_left}/{phallus.total_supply}
          </span>
        </div>
        <div className="mt-4 flex flex-col items-stretch space-y-1">
          {isValidObject(user) ? (
            <div className="py-2 px-3 2xl:py-3 2xl:px-4 flex bg-zinc-900 items-center justify-between">
              <div className="flex items-center space-x-4">
                <Image
                  src="https://static.cdn.zo.xyz/app-media/logos/bitcoin.svg"
                  width={24}
                  height={24}
                  alt="bitcoin"
                />
                <span className="font-medium text-zinc-50 text-sm 2xl:text-base">
                  {formatAddress(user.wallet_address)}
                </span>
              </div>
              <Check />
            </div>
          ) : (
            <button
              className="bg-zinc-100 w-full py-2 px-3 2xl:py-3 2xl:px-4 flex items-center disabled:cursor-not-allowed disabled:opacity-50 space-x-4"
              onClick={openConnectModal}
            >
              <Image
                src="https://static.cdn.zo.xyz/app-media/logos/bitcoin.svg"
                width={24}
                height={24}
                alt="bitcoin"
              />
              <span className="font-medium text-black text-sm 2xl:text-base">
                Connect Bitcoin Wallet
              </span>
            </button>
          )}
          {isValidObject(twitterProfile) ? (
            <div className="py-2 px-3 2xl:py-3 2xl:px-4 flex bg-zinc-900 items-center justify-between">
              <div className="flex items-center space-x-4">
                <Image
                  src="https://static.cdn.zo.xyz/app-media/logos/twitter-circle.svg"
                  width={24}
                  height={24}
                  alt="bitcoin"
                />
                <span className="font-medium text-zinc-50 text-sm 2xl:text-base">
                  @{twitterProfile.username}
                </span>
              </div>
              <Check />
            </div>
          ) : (
            <button
              className="bg-zinc-100 w-full py-2 px-3 2xl:py-3 2xl:px-4 flex items-center disabled:cursor-not-allowed disabled:opacity-50 space-x-4"
              disabled={!isValidObject(user)}
              onClick={connect}
            >
              <Image
                src="https://static.cdn.zo.xyz/app-media/logos/twitter-circle.svg"
                width={24}
                height={24}
                alt="bitcoin"
              />
              <span className="font-medium text-black text-sm 2xl:text-base">
                Connect Twitter
              </span>
            </button>
          )}
          {isValidObject(user) && !isValidObject(mintStatus) ? (
            hasBalance ? (
              <button
                className="bg-zinc-100 w-full py-2 px-3 2xl:py-3 2xl:px-4 flex items-center disabled:cursor-not-allowed disabled:opacity-50 space-x-4"
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
                <span className="font-medium text-black text-sm 2xl:text-base">
                  Mint Phallus
                </span>
              </button>
            ) : (
              <div className="py-2 px-3 2xl:py-3 2xl:px-4 flex bg-zinc-900 items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src="https://static.cdn.zo.xyz/media/phallus.png"
                    width={24}
                    height={24}
                    className="rounded-full"
                    alt="bitcoin"
                  />
                  <span className="font-medium text-zinc-50 text-sm 2xl:text-base">
                    Low Balance, Cannot Mint
                  </span>
                </div>
              </div>
            )
          ) : (
            <button
              className="bg-zinc-100 w-full py-2 px-3 2xl:py-3 2xl:px-4 flex items-center disabled:cursor-not-allowed disabled:opacity-50 space-x-4"
              disabled={!isValidObject(twitterProfile) || !hasMintStarted}
              onClick={initiateMint}
            >
              <Image
                src="https://static.cdn.zo.xyz/media/phallus.png"
                width={24}
                className="rounded-full"
                height={24}
                alt="bitcoin"
              />
              <span className="font-medium text-black text-sm 2xl:text-base">
                {hasMintStarted ? "Mint Phallus" : "Mint Starting Soon"}
              </span>
            </button>
          )}
        </div>
      </div>
    ) : (
      <div className="p-4 flex flex-col items-stretch">
        <div className="flex items-center justify-between">
          <span className="text-xl">SOLD OUT</span>
          <span className="text-xl">
            {phallus.total_supply - phallus.supply_left}/{phallus.total_supply}
          </span>
        </div>
      </div>
    ))
  );
};

export default PhallusMint;
