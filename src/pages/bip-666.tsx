import { Footer, Header, MetaTags } from "@/components";
import IntroText from "@/components/IntroText";
import MintInfo from "@/components/MintInfo";
import MintSuccessInfo from "@/components/MintSuccessInfo";
import Minter from "@/components/Minter";
import PhallusCard from "@/components/PhallusCard";
import PhallusFooter from "@/components/PhallusFooter";
import { useAuth, useUser } from "@/hooks";
import startConfetti from "@/utils/confetti";
import { isValidObject } from "@/utils/object";
import queries from "@/utils/queries";
import { isValidString } from "@/utils/string";
import { NextPage } from "next";
import { Space_Grotesk } from "next/font/google";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

const meta = {
  title: "Bitcoin Inscribed Phalluses - 666",
  description:
    "The universal symbol of humanity, inscribed on the Bitcoin blockchain.",
  shortcutIcon: "https://static.cdn.zo.xyz/media/phallus.png",
  image: "https://static.cdn.zo.xyz/media/banner-phallus.png",
};

const Phallus: NextPage = () => {
  const { user } = useUser();
  const { isLoggedIn } = useAuth();

  const [startFetching, setStartFetching] = useState<boolean>(false);
  const [phallusId, setPhallusId] = useState<string>("");
  const [isMinted, setMinted] = useState<boolean>(false);

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

  useEffect(() => {
    if (isMinted) {
      setTimeout(startConfetti, 2000);
    }
  }, [isMinted]);

  useEffect(() => {
    if (mintStatus != null) {
      if (!isNaN(mintStatus?.sequence_id) && mintStatus?.sequence_id > 0) {
        setPhallusId(`${mintStatus.sequence_id}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mintStatus]);

  useEffect(() => {
    if (!isLoggedIn) {
      setMinted(false);
      setPhallusId("");
      setStartFetching(false);
    }
  }, [isLoggedIn]);

  return (
    <main
      className={`bg-z-black min-h-screen relative h-full text-z-white ${spaceGrotesk.className}`}
    >
      <div
        className={`fixed top-0 inset-x-0 z-20 ${
          isValidObject(mintStatus) ? "bg-z-black" : "transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto w-full">
          <Header />
        </div>
      </div>
      <MetaTags {...meta} />
      {!isValidObject(mintStatus) && (
        <div className="absolute top-0 lg:left-1/2 left-0 right-0 lg:bottom-0 h-[800px] lg:h-auto bg-[url('https://cdn.discordapp.com/attachments/1115714210308050954/1124317149234741309/BIP666.png')]">
          <div className="absolute inset-0 bg-black bg-opacity-80" />
        </div>
      )}
      <section className="bg-z-black min-h-screen flex flex-col lg:flex-row items-stretch max-w-6xl px-4 w-full mx-auto">
        <section className="flex-1 lg:pr-4 relative py-8 lg:py-32 order-2 lg:order-1 flex flex-col justify-center">
          {isMinted ? (
            <MintSuccessInfo mintStatus={mintStatus} />
          ) : isValidObject(mintStatus) ? (
            <MintInfo mintStatus={mintStatus} />
          ) : (
            <IntroText />
          )}
        </section>
        <section className="flex-1 relative lg:pl-4 order-1 lg:order-2 pt-32 lg:pt-0 flex items-center lg:justify-center">
          {!isValidObject(mintStatus) ? (
            <Minter
              mintStatus={mintStatus}
              refetchMintStatus={refetchMintStatus}
            />
          ) : isValidString(phallusId) ? (
            <PhallusCard phallusId={phallusId} />
          ) : (
            <Image
              src="https://static.cdn.zo.xyz/web-media/bitcoin-bros/placeholder.svg"
              width={350}
              height={545}
              alt="Placeholder"
            />
          )}
        </section>
      </section>
      <PhallusFooter />
    </main>
  );
};

export default Phallus;
