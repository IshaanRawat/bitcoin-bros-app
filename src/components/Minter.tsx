import config from "@/data/config.json";
import {
  useTwitter,
  useUser,
  useWalletAuthentication,
  useWeb3,
  useWhitelist,
} from "@/hooks";
import { formatAddress } from "@/utils/auth";
import mutations from "@/utils/mutations";
import { isValidObject } from "@/utils/object";
import queries from "@/utils/queries";
import { isValidString } from "@/utils/string";
import React, { useMemo } from "react";
import { useMutation, useQuery } from "react-query";
import { GeneralObject } from "../..";
import Button from "./Button";
import ButtonCompletion from "./ButtonCompletion";

interface MinterProps {
  mintStatus: GeneralObject;
  refetchMintStatus: () => void;
}

const Minter: React.FC<MinterProps> = ({ mintStatus, refetchMintStatus }) => {
  const { connect } = useTwitter("PHALLUS");
  const { twitterProfile, whitelist } = useWhitelist("PHALLUS");
  const { openConnectModal } = useWalletAuthentication();
  const { user } = useUser();
  const { createTransaction } = useWeb3();

  const { data: phallus } = useQuery(["phallus"], queries.COLLECTION_PHALLUS, {
    enabled: true,
    select: (data) => data.data,
  });

  const { data: utxos } = useQuery(
    ["phallus", "whitelist", "utxos"],
    queries.PHALLUS_WHITELIST_UTXOS,
    {
      enabled: isValidObject(user) && !isValidObject(mintStatus),
      retry: false,
      select: (data) => data.data,
    }
  );

  const { mutate } = useMutation(mutations.PHALLUS_MINT_INITIATE);

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

  const openMagicEden = () => {
    window.open("https://magiceden.io/ordinals/marketplace/bip-666", "_blank");
  };

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

  return (
    <article className="bg-z-light-black flex flex-col w-full lg:w-3/4">
      <video
        className="w-[400px] h-[400px] object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="https://cdn.discordapp.com/attachments/1034805665878773890/1130504602358390814/Phallus_dance_crossfade_style_02.mp4"
          type="video/mp4"
        />
      </video>
      {user == null ? (
        <div className="flex flex-col items-stretch p-4 space-y-1">
          <div className="flex items-center justify-between pb-3">
            <span className="text-xl">Free Mint</span>
            {phallus != null && (
              <span className="text-xl">
                {phallus.total_supply - phallus.supply_left}/
                {phallus.total_supply}
              </span>
            )}
          </div>
          {isValidObject(user) ? (
            <ButtonCompletion
              imageSrc="https://static.cdn.zo.xyz/web-media/bitcoin-bros/bitcoin.svg"
              isCompleted
            >
              {formatAddress(user.wallet_address)}
            </ButtonCompletion>
          ) : (
            <Button
              imageSrc="https://static.cdn.zo.xyz/web-media/bitcoin-bros/bitcoin.svg"
              onClick={openConnectModal}
            >
              Connect Ordinals Wallet
            </Button>
          )}
          {isValidObject(twitterProfile) ? (
            <ButtonCompletion
              imageSrc="https://static.cdn.zo.xyz/web-media/bitcoin-bros/twitter.svg"
              isCompleted
            >
              {`@${twitterProfile.username}`}
            </ButtonCompletion>
          ) : (
            <Button
              disabled={!isValidObject(user)}
              imageSrc={
                !isValidObject(user)
                  ? "https://static.cdn.zo.xyz/web-media/bitcoin-bros/twitter-disabled.svg"
                  : "https://static.cdn.zo.xyz/web-media/bitcoin-bros/twitter.svg"
              }
              onClick={connect}
            >
              Connect Twitter
            </Button>
          )}
          <Button
            disabled={!hasBalance || whitelist?.status !== "approved"}
            imageSrc={
              !hasBalance || whitelist?.status !== "approved"
                ? "https://static.cdn.zo.xyz/web-media/bitcoin-bros/phallus-disabled.svg"
                : "https://static.cdn.zo.xyz/web-media/bitcoin-bros/phallus.svg"
            }
            onClick={initiateMint}
          >
            {isValidObject(user)
              ? whitelist?.status !== "approved"
                ? "Cannot Mint, Whitelist pending."
                : !hasBalance
                ? "Cannot Mint, Insufficient Balance."
                : "Mint Phallus"
              : "Mint Phallus"}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-stretch p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xl">Sold Out</span>
            <span className="text-xl">666/666</span>
          </div>
          <Button
            imageSrc="https://static.cdn.zo.xyz/web-media/bitcoin-bros/magiceden.svg"
            onClick={openMagicEden}
          >
            Buy on Magic Eden
          </Button>
        </div>
      )}
    </article>
  );
};

export default Minter;
