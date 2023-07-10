import { useTwitter, useUser, useWalletAuthentication } from "@/hooks";
import { Check } from "@/icons";
import { randomTweetMessage } from "@/utils/tweet";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import Loading from "./Loading";
import Pledges from "./Pledges";

interface OnboardingProps {
  setOnboarded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Onboarding: React.FC<OnboardingProps> = ({ setOnboarded }) => {
  const { isLoggedIn, openConnectModal } = useWalletAuthentication();

  const {
    connect,
    follow,
    isFetchingTwitterAuth,
    isLoadingFollow,
    isLoadingPost,
    isLoadingTwitterAuth,
    isRateLimitExceeded,
    post,
  } = useTwitter();

  const { user, refetchUser } = useUser();

  const whitelistTweet = useMemo(randomTweetMessage, []);

  const [isTweetSharable, setTweetSharable] = useState<boolean>(false);
  const [isOnboarding, setOnboarding] = useState<boolean>(false);

  const connectTwitter = async () => {
    setOnboarding(true);
    await connect();
  };

  const followOnTwitter = async () => {
    setOnboarding(true);
    await follow(refetchUser);
  };

  const postOnTwitter = async () => {
    await post(whitelistTweet, refetchUser);
  };

  useEffect(() => {
    if (
      user &&
      (isRateLimitExceeded || (user.isFollowing && !user.isWhitelistPostShared))
    ) {
      setTweetSharable(true);
    }
    if (user && user.isWhitelistPostShared) {
      setTweetSharable(false);
    }
  }, [isRateLimitExceeded, user]);

  useEffect(() => {
    if (!isLoggedIn) {
      setOnboarding(false);
      setTweetSharable(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (user && user.walletAddress && user.twitterUser && user.isFollowing) {
      setOnboarded(true);
    } else {
      setOnboarded(false);
    }
  }, [setOnboarded, user]);

  return (
    <>
      {!(
        !isOnboarding &&
        user?.walletAddress &&
        user?.twitterUser &&
        user?.isFollowing
      ) && <p className="text-lg text-zinc-300 mt-8">Join the whitelist.</p>}
      <div className="mt-4 flex flex-col space-y-1 w-full">
        {isLoggedIn && user?.walletAddress ? (
          isOnboarding && (
            <div className="py-4 px-4 lg:px-8 flex bg-zinc-900 items-center justify-between">
              <div className="flex items-center space-x-4">
                <Image
                  src="https://static.cdn.zo.xyz/app-media/logos/bitcoin.svg"
                  width={24}
                  height={24}
                  alt="bitcoin"
                />
                <span className="font-medium text-zinc-50">
                  {user?.walletAddress.slice(0, 6)}...
                  {user?.walletAddress.slice(-4)}
                </span>
              </div>
              <Check />
            </div>
          )
        ) : (
          <button
            className="bg-zinc-100 py-4 px-4 lg:px-8 flex items-center space-x-4"
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
        {isLoggedIn && user?.twitterUser ? (
          isOnboarding && (
            <div className="py-4 px-4 lg:px-8 flex bg-zinc-900 items-center justify-between">
              <div className="flex items-center space-x-4">
                <Image
                  src="https://static.cdn.zo.xyz/app-media/logos/twitter-circle.svg"
                  width={24}
                  height={24}
                  alt="bitcoin"
                />
                <span className="font-medium text-zinc-50">
                  @{user?.twitterUser?.username}
                </span>
              </div>
              <Check />
            </div>
          )
        ) : (
          <button
            className="bg-zinc-100 py-4 px-4 lg:px-8 flex items-center disabled:cursor-not-allowed disabled:opacity-50 space-x-4"
            disabled={!isLoggedIn || !user?.walletAddress}
            onClick={connectTwitter}
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
        {isLoggedIn ? (
          user?.isFollowing ? (
            isOnboarding && (
              <div className="py-4 px-4 lg:px-8 flex bg-zinc-900 items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src="https://static.cdn.zo.xyz/app-media/logos/bitcoin-bros.jpeg"
                    className="rounded-full"
                    width={24}
                    height={24}
                    alt="bitcoin"
                  />
                  <span className="font-medium text-zinc-50">
                    Following @BitcoinBrosXYZ
                  </span>
                </div>
                <Check />
              </div>
            )
          ) : isRateLimitExceeded ? null : (
            <button
              className="bg-zinc-100 py-4 px-4 lg:px-8 flex items-center disabled:cursor-not-allowed disabled:opacity-30 space-x-4"
              onClick={followOnTwitter}
              disabled={!user?.twitterUser}
            >
              <Image
                src="https://static.cdn.zo.xyz/app-media/logos/bitcoin-bros.jpeg"
                className="rounded-full"
                width={24}
                height={24}
                alt="bitcoin"
              />
              <span className="font-medium text-black">
                Follow @BitcoinBrosXYZ
              </span>
            </button>
          )
        ) : (
          <button
            className="bg-zinc-100 py-4 px-4 lg:px-8 flex items-center disabled:cursor-not-allowed disabled:opacity-30 space-x-4"
            disabled={!isLoggedIn || !user?.walletAddress || !user?.twitterUser}
            onClick={followOnTwitter}
          >
            <Image
              src="https://static.cdn.zo.xyz/app-media/logos/bitcoin-bros.jpeg"
              className="rounded-full"
              width={24}
              height={24}
              alt="bitcoin"
            />
            <span className="font-medium text-black">
              Follow @BitcoinBrosXYZ
            </span>
          </button>
        )}

        {isLoggedIn ? (
          user?.isFollowing ? (
            <>
              <div className="py-4 px-4 lg:px-8 flex bg-[#CFFF50] items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Check fill="#18181b" className="flex-shrink-0" />
                  <span className="font-medium text-zinc-900">
                    Thanks bro 🤙 Vibe-check in progress!
                  </span>
                </div>
              </div>
              <Pledges />
            </>
          ) : isRateLimitExceeded ? (
            <>
              <div className="py-4 px-4 lg:px-8 flex bg-[#CFFF50] items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Check fill="#18181b" />
                  <span className="font-medium text-zinc-900">
                    Thanks bro 🤙 Vibe-check in progress! Follow us on{" "}
                    <a
                      href="https://www.twitter.com/BitcoinBrosXYZ"
                      className="underline font-bold"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Twitter
                    </a>{" "}
                    to stay updated.
                  </span>
                </div>
              </div>
              <Pledges />
            </>
          ) : null
        ) : null}
        {isTweetSharable
          ? user?.twitterUser && (
              <>
                <div className="mt-8">
                  <h2 className="font-medium text-2xl text-zinc-100">
                    It&apos;s time to get proud
                    <br />
                    and loud on Twitter
                  </h2>
                </div>
                <>
                  <button
                    className="bg-blue-400 max-w-md w-full py-4 px-4 lg:px-8 mt-4 font-medium"
                    onClick={postOnTwitter}
                  >
                    Share Tweet
                  </button>
                  <div className="flex flex-col max-w-md bg-zinc-900 text-zinc-100 p-4">
                    <div className="flex space-x-4">
                      <div className="w-12 h-12 flex-shrink-0 bg-[#2daae1] rounded-full flex items-center justify-center">
                        <Image
                          src="https://static.cdn.zo.xyz/app-media/logos/twitter-circle.svg"
                          alt="twitter"
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold">
                          {user?.twitterUser?.name}
                        </span>
                        <span className="font-medium text-sm text-zinc-300">
                          @{user?.twitterUser?.username}
                        </span>
                      </div>
                    </div>
                    <p className="mt-4 whitespace-pre-line">
                      {whitelistTweet.tweet}
                      <br />
                      <a
                        href="https://bitcoinbros.xyz"
                        className="text-blue-400"
                      >
                        bitcoinbros.xyz
                      </a>
                    </p>
                  </div>
                </>
              </>
            )
          : user?.isWhitelistPostShared &&
            isOnboarding && (
              <div className="py-4 px-4 lg:px-8 mt-8 flex bg-[#CFFF50] items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Check fill="#18181b" />
                  <span className="font-medium text-zinc-900">
                    Tweeted your arrival!
                  </span>
                </div>
              </div>
            )}
      </div>

      {(isFetchingTwitterAuth ||
        isLoadingFollow ||
        isLoadingPost ||
        isLoadingTwitterAuth) && <Loading />}
    </>
  );
};

export default Onboarding;
