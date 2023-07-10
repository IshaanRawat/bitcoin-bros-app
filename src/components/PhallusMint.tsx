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
import Image from "next/image";
import React from "react";
import { useMutation } from "react-query";

interface PhallusMintProps {}

const PhallusMint: React.FC<PhallusMintProps> = () => {
  const { openConnectModal } = useWalletAuthentication();
  const { createTransaction } = useWeb3();
  const { user } = useUser();
  const { connect } = useTwitter();
  const { twitterProfile } = useWhitelist();

  const { mutate } = useMutation(mutations.MINT_INITIATE);

  const initiateMint = () => {
    createTransaction(0);
    // mutate({
    //   payment_transaction_id: "123",
    // });
  };

  return (
    <div className="p-4 flex flex-col items-stretch">
      <div className="flex items-center justify-between">
        <span className="text-xl">Free Mint</span>
        <span className="text-xl">0/666</span>
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
            src="https://static.cdn.zo.xyz/app-media/logos/bitcoin-bros.jpeg"
            width={24}
            className="rounded-full"
            height={24}
            alt="bitcoin"
          />
          <span className="font-medium text-black">Mint Phallus</span>
        </button>
      </div>
    </div>
  );
};

export default PhallusMint;
