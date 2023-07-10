/* eslint-disable @next/next/no-img-element */
import {
  Footer,
  Header,
  LoginSection,
  Page,
  Step,
  TwitterPledge,
} from "@/components";
import pledges from "@/data/pledges.json";
import { useAuth, useTwitter, useWhitelist } from "@/hooks";
import { randomTweetMessage } from "@/utils/tweet";
import { NextPage } from "next";
import Image from "next/image";
import { useMemo } from "react";

const Home: NextPage = () => {
  const { isLoggedIn } = useAuth();
  const { connect, follow, post } = useTwitter("BROS");

  const whitelistTweet = useMemo(randomTweetMessage, []);

  const { steps, twitterProfile, refetch } = useWhitelist("BROS");

  return (
    <Page>
      <Header />
      <section
        className={`flex-1 ${
          !isLoggedIn && "pt-[140px] lg:pt-[140px]"
        } p-4 lg:p-8 flex overflow-y-auto flex-col relative transition-all ease-in-out duration-200`}
      >
        <div className="flex flex-col max-w-md w-full">
          <h1 className="text-4xl lg:text-6xl font-bold text-zinc-100">
            Bitcoin Bros
          </h1>

          {isLoggedIn ? (
            <>
              <div className="flex items-stretch mt-8">
                <div className="w-2 bg-zinc-900" />
                <div className="flex flex-col py-4">
                  <Step
                    state={
                      steps.isWalletConnected
                        ? steps.isTwitterConnected
                          ? "completed"
                          : "active"
                        : "disabled"
                    }
                  >
                    {steps.isTwitterConnected ? (
                      <div className="py-4 px-4 flex bg-zinc-900 items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Image
                            src="https://static.cdn.zo.xyz/app-media/logos/twitter-circle.svg"
                            width={24}
                            height={24}
                            alt="bitcoin"
                          />
                          <span className="font-medium text-zinc-50">
                            @{twitterProfile?.username}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <button
                        className="bg-zinc-100 py-4 px-4 flex items-center space-x-4"
                        onClick={connect}
                      >
                        <Image
                          src="https://static.cdn.zo.xyz/app-media/logos/twitter-circle.svg"
                          width={24}
                          height={24}
                          alt="bitcoin"
                        />
                        <span className="font-medium text-black">
                          Connect Twitter
                        </span>
                      </button>
                    )}
                  </Step>
                  <Step
                    state={
                      steps.isTwitterConnected
                        ? steps.isTwitterFollowed
                          ? "completed"
                          : "active"
                        : "disabled"
                    }
                  >
                    {steps.isTwitterFollowed ? (
                      <div className="py-4 px-4 flex bg-zinc-900 items-center justify-between">
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
                      </div>
                    ) : (
                      <button
                        className="bg-zinc-100 py-4 px-4 flex items-center space-x-4"
                        onClick={follow.bind(null, refetch)}
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
                  </Step>
                  <Step
                    state={
                      steps.isTwitterConnected
                        ? steps.isWelcomeTweeted
                          ? "completed"
                          : "active"
                        : "disabled"
                    }
                  >
                    {steps.isWelcomeTweeted ? (
                      <div className="py-4 px-4 flex bg-zinc-900 items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Image
                            src="https://static.cdn.zo.xyz/app-media/logos/twitter-circle.svg"
                            className="rounded-full"
                            width={24}
                            height={24}
                            alt="bitcoin"
                          />
                          <span className="font-medium text-zinc-50">
                            Tweeted your arrival
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col max-w-md w-full">
                        <h2 className="font-bold text-xl lg:text-2xl text-zinc-100">
                          Time to get loud and proud on Twitter
                        </h2>
                        <button
                          className="bg-blue-400 max-w-md w-full py-4 px-4 lg:px-8 mt-4 font-medium"
                          onClick={post.bind(null, whitelistTweet, refetch)}
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
                                {twitterProfile?.name}
                              </span>
                              <span className="font-medium text-sm text-zinc-300">
                                @{twitterProfile?.username}
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
                      </div>
                    )}
                  </Step>

                  {pledges.map((pledge, index) => (
                    <Step
                      state={steps.isTwitterConnected ? "active" : "disabled"}
                      key={pledge.id}
                    >
                      <div className="flex flex-col">
                        <h2 className="font-bold text-xl lg:text-2xl text-zinc-100">
                          Pledge #{index + 1}
                        </h2>
                        <TwitterPledge pledge={pledge} />
                      </div>
                    </Step>
                  ))}
                  <Step
                    state={steps.isTwitterConnected ? "active" : "disabled"}
                  >
                    <div className="flex flex-col">
                      <h2 className="font-bold text-xl lg:text-2xl text-zinc-100">
                        More Pledges coming...
                        <br />
                        Stay Tuned.
                      </h2>
                    </div>
                  </Step>
                </div>
              </div>
            </>
          ) : (
            <LoginSection />
          )}
        </div>
        <Footer />
      </section>
    </Page>
  );
};

export default Home;
