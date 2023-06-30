import axios from "axios";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { EmptyFunction, Tweet } from "../..";
import config from "./../../config.json";
const useTwitter = () => {
  const [isRateLimitExceeded, setRateLimitExceeded] = useState<boolean>(false);

  const {
    refetch: followBB,
    isLoading: isLoadingFollow,
    isFetching: isFetchingFollow,
  } = useQuery(
    ["follow"],
    () => axios.get(`${config.BASE_API_URL}/api/follow`),
    {
      enabled: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
      onError: (error: any) => {
        console.log(error.response);
        if (error?.response?.status === 429) {
          setRateLimitExceeded(true);
        }
      },
    }
  );

  const { mutate: postBB, isLoading: isLoadingPost } = useMutation(
    (data: any) => axios.post(`${config.BASE_API_URL}/api/post`, data)
  );

  const {
    refetch: connectTwitter,
    isLoading: isLoadingTwitterAuth,
    isFetching: isFetchingTwitterAuth,
  } = useQuery(
    ["twitter", "auth"],
    () =>
      axios.post(
        `${config.BASE_API_URL}/api/v1/webthree/ordinals/bitcoin-bros/whitelist/twitter/oauth/request/`
      ),
    {
      enabled: false,
    }
  );

  const connect = async () => {
    const data = await connectTwitter();
    if (data) {
      window.open(data?.data?.data.authorization_url, "_blank");
    }
  };

  const follow = async (onSuccess: EmptyFunction) => {
    const data = await followBB();
    if (data.data?.data.success) {
      onSuccess();
    }
  };

  const post = async (tweet: Tweet, onSuccess: EmptyFunction) => {
    postBB(
      {
        id: tweet.id,
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
    isFetchingFollow,
    post,
    isLoadingPost,
    connect,
    isLoadingTwitterAuth,
    isFetchingTwitterAuth,
    isRateLimitExceeded,
  };
};

export default useTwitter;
