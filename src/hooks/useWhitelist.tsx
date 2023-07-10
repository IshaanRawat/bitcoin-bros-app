import mutations from "@/utils/mutations";
import { isValidObject } from "@/utils/object";
import queries from "@/utils/queries";
import { isValidString } from "@/utils/string";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Steps } from "../..";
import useAuth from "./useAuth";
import useWeb3 from "./useWeb3";

const useWhitelist = (collection: "PHALLUS" | "BROS") => {
  const [steps, setSteps] = useState<Steps>({
    isWalletConnected: false,
    isTwitterConnected: false,
    isTwitterFollowed: false,
    isWelcomeTweeted: false,
  });
  const { isLoggedIn } = useAuth();
  const { address } = useWeb3();

  const {
    isLoading,
    error,
    refetch,
    data: whitelist,
  } = useQuery(
    ["webthree", "ordinals", "bitcoin-bros", "whitelist"],
    collection === "BROS" ? queries.BROS_WHITELIST : queries.PHALLUS_WHITELIST,
    {
      enabled: isLoggedIn === true,
      retry: false,
      refetchOnWindowFocus: true,
      refetchOnMount: false,
      refetchOnReconnect: true,
      select: (data) => data.data,
    }
  );

  const { mutate } = useMutation(
    collection === "BROS"
      ? mutations.BROS_WHITELIST
      : mutations.PHALLUS_WHITELIST
  );
  const { mutate: verifyTwitter } = useMutation(
    collection === "BROS"
      ? mutations.BROS_CHALLENGES_TWITTER_CONNECT
      : mutations.PHALLUS_CHALLENGES_TWITTER_CONNECT
  );

  const twitterProfile = useMemo(
    () => whitelist?.twitter_ref_user,
    [whitelist]
  );

  useEffect(() => {
    console.log("isLoggedIn", isLoggedIn);
    if (isLoggedIn) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  useEffect(() => {
    if (
      address.payment != "" &&
      error &&
      (error as any).response.status === 404
    ) {
      mutate(
        {
          payment_address: address.payment,
          ordinal_address: address.ordinal,
        },
        {
          onSuccess: () => {
            refetch();
          },
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, address]);

  useEffect(() => {
    if (whitelist) {
      if (
        whitelist.twitter_oauth_completed &&
        !isValidObject(whitelist.twitter_ref_user)
      ) {
        verifyTwitter(
          {},
          {
            onSuccess: () => {
              refetch();
            },
          }
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [whitelist]);

  useEffect(() => {
    if (whitelist) {
      const _steps: Steps = {
        isWalletConnected: false,
        isTwitterConnected: false,
        isTwitterFollowed: false,
        isWelcomeTweeted: false,
      };
      if (isValidString(whitelist.payment_address)) {
        _steps.isWalletConnected = true;
        if (whitelist.twitter_oauth_completed) {
          _steps.isTwitterConnected = true;
          if (whitelist.challenges_completed) {
            if (whitelist.challenges_completed.includes("twitter-follow")) {
              _steps.isTwitterFollowed = true;
            }
            if (whitelist.challenges_completed.includes("twitter-post")) {
              _steps.isWelcomeTweeted = true;
            }
          }
        } else {
          _steps.isTwitterConnected = false;
        }
      } else {
        _steps.isWalletConnected = false;
      }
      setSteps(_steps);
    }
  }, [whitelist]);

  return {
    refetch,
    steps,
    twitterProfile,
  };
};

export default useWhitelist;
