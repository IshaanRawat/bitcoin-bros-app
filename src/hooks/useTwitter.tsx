import mutations from "@/utils/mutations";
import queries from "@/utils/queries";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { EmptyFunction, Tweet } from "../..";
const useTwitter = () => {
  const [isRateLimitExceeded, setRateLimitExceeded] = useState<boolean>(false);

  const { mutate: followBB, isLoading: isLoadingFollow } = useMutation(
    mutations.CHALLENGES_TWITTER_FOLLOW
  );

  const { mutate: postBB, isLoading: isLoadingPost } = useMutation(
    mutations.CHALLENGES_TWITTER_POST
  );

  const {
    refetch: connectTwitter,
    isLoading: isLoadingTwitterAuth,
    isFetching: isFetchingTwitterAuth,
  } = useQuery(["twitter", "auth", "request"], queries.TWITTER_AUTH_REQUEST, {
    enabled: false,
  });

  const connect = async () => {
    const data = await connectTwitter();
    if (data) {
      window.open(data?.data?.data.url, "_blank");
    }
  };

  const follow = async (onSuccess: EmptyFunction) => {
    followBB(
      {},
      {
        onSuccess,
        onError: (error: any) => {
          console.log(error.response);
          if (error?.response?.status === 429) {
            setRateLimitExceeded(true);
          }
        },
      }
    );
  };

  const post = async (tweet: Tweet, onSuccess: EmptyFunction) => {
    postBB(
      {
        tweet_text: tweet.tweet,
      },
      {
        onSuccess: (data) => {
          if (data.data.success) {
            onSuccess();
          }
        },
        onError: (error: any) => {
          console.log(error.response);
          window.open(tweet.shareLink, "_blank");
        },
      }
    );
  };

  return {
    follow,
    isLoadingFollow,
    post,
    isLoadingPost,
    connect,
    isLoadingTwitterAuth,
    isFetchingTwitterAuth,
    isRateLimitExceeded,
  };
};

export default useTwitter;
