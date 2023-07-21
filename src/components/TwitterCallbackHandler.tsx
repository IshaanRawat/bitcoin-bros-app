import mutations from "@/utils/mutations";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useMutation } from "react-query";
import Page from "./Page";

interface TwitterCallbackHandlerProps {
  collection: "PHALLUS" | "BROS";
}

const TwitterCallbackHandler: React.FC<TwitterCallbackHandlerProps> = ({
  collection,
}) => {
  const { mutate } = useMutation(
    collection === "BROS"
      ? mutations.BROS_TWITTER_OAUTH_VERIFY
      : mutations.PHALLUS_TWITTER_OAUTH_VERIFY
  );

  const [state, setState] = useState<"error" | "success" | "loading" | string>(
    "loading"
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const state = urlParams.get("state");
    const code = urlParams.get("code");

    if (state && code) {
      mutate(
        {
          state,
          code,
        },
        {
          onSuccess: (res) => {
            if (res.status === 200) {
              setState("success");
            } else {
              setState("error");
            }
          },
          onError: (res: any) => {
            console.log(res.response);
            if (res.response.status === 400 && res.response.data.errors) {
              setState(res.response.data.errors.join("\n"));
            } else {
              setState("error");
            }
          },
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const text = useMemo(() => {
    switch (state) {
      case "loading":
        return {
          heading: "Please Wait",
          body: "Connecting to Twitter...",
        };
      case "success":
        return {
          heading: "Success!",
          body: "You have successfully connected to Twitter.\nYou can close this window now.",
        };
      case "error":
        return {
          heading: "Error!",
          body: "Something went wrong. Please try again.",
        };
      default:
        return {
          heading: "Oh ho!",
          body: state,
        };
    }
  }, [state]);

  return (
    <Page noVideo>
      <header className="flex-shrink-0 p-4 lg:p-8 relative flex justify-center pointer-events-none">
        <Image
          src="https://static.cdn.zo.xyz/app-media/animojis/zobitcoin.gif"
          alt="zo"
          width={48}
          height={48}
        />
      </header>
      <section className="flex-1 flex justify-center pt-24 relative px-4 lg:px-8">
        <div className="max-w-md w-full h-max flex flex-col items-center p-4 bg-zinc-800 text-z-white">
          <Image
            src="https://static.cdn.zo.xyz/app-media/logos/twitter-circle.svg"
            width={48}
            height={48}
            alt="bitcoin"
          />
          <h1 className="font-bold mt-4 text-2xl text-center">
            {text.heading}
          </h1>
          <p className="mt-2 text-base whitespace-pre-wrap text-center">
            {text.body}
          </p>
        </div>
      </section>
    </Page>
  );
};

export default TwitterCallbackHandler;
