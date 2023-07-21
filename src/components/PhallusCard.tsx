import {
  AngleDown,
  Download,
  Emoji,
  PhallusDress,
  PhallusEyewear,
  PhallusHead,
} from "@/icons";
import { downloadImages } from "@/utils/files";
import { isValidString } from "@/utils/string";
import axios from "axios";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { GeneralObject } from "../..";

interface PhallusCardProps {
  phallusId: string;
}

const PhallusCard: React.FC<PhallusCardProps> = ({ phallusId }) => {
  const [hasImageErrored, setImageErrored] = useState<boolean>(false);
  const [isDownloading, setDownloading] = useState<boolean>(false);

  const {
    data: phallusData,
    isLoading,
    isFetching,
    isError,
  } = useQuery(
    ["phallus", phallusId],
    () =>
      axios.get(`https://nft-cdn.zo.xyz/bros/phallus/${phallusId}.json`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: null,
          "client-device-id": null,
          "client-device-secret": null,
          "client-key": null,
        },
      }),
    {
      enabled: isValidString(phallusId),
      retry: false,
      select: (data) => data.data,
    }
  );

  const traits = useMemo(() => {
    if (phallusData) {
      console.log(phallusData);
      const _traits: GeneralObject = {};
      phallusData.meta?.attributes?.forEach((a: GeneralObject) => {
        _traits[a.trait_type] = a.value;
      });
      return _traits;
    } else {
      return {};
    }
  }, [phallusData]);

  const download = () => {
    downloadImages(
      [
        `https://nft-cdn.zo.xyz/bros/phallus/${phallusId}.svg`,
        `https://nft-cdn.zo.xyz/bros/phallus/${phallusId}.png`,
        `https://nft-cdn.zo.xyz/bros/phallus/${phallusId}.gif`,
        `https://nft-cdn.zo.xyz/bros/phallus/${phallusId}.mp4`,
      ],
      `Phallus #${phallusId}`,
      setDownloading
    );
  };

  return !hasImageErrored && !isLoading && !isFetching && !isError ? (
    <div className="relative w-[350px] h-[545px] bg-[#FF9900] text-z-black flex items-center flex-col">
      <Image
        src={`https://nft-cdn.zo.xyz/bros/phallus/${phallusId}.svg`}
        className="object-cover flex-shrink-0 mt-4"
        width={240}
        height={240}
        alt="phallus"
        onError={setImageErrored.bind(null, true)}
      />
      <div className="flex flex-col flex-1 items-start px-8 pt-4 w-full bg-[url('https://static.cdn.zo.xyz/web-media/bitcoin-bros/phallus-card-pattern.svg')] bg-no-repeat bg-center bg-cover bg-size-500">
        <span className="font-bold text-2xl">Phallus #{phallusId}</span>
        <span className="font-semibold">Rank: 69</span>
        <div className="grid grid-cols-2 w-full grid-rows-2 gap-4 mt-4">
          <div className="flex items-start space-x-2">
            <PhallusHead className="w-8 h-8" />
            <div className="flex flex-col">
              <span className="text-z-light-black">Head</span>
              <span className="text-z-black font-semibold">{traits.head}</span>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <PhallusEyewear className="w-8 h-8" />
            <div className="flex flex-col">
              <span className="text-z-light-black">Eyewear</span>
              <span className="text-z-black font-semibold">
                {traits.eyewear}
              </span>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <PhallusDress className="w-8 h-8" />
            <div className="flex flex-col">
              <span className="text-z-light-black">Skin</span>
              <span className="text-z-black font-semibold">{traits.skin}</span>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Emoji className="w-8 h-8" />
            <div className="flex flex-col">
              <span className="text-z-light-black">Face</span>
              <span className="text-z-black font-semibold">{traits.face}</span>
            </div>
          </div>
        </div>
      </div>
      <button
        className="px-8 flex-shrink-0 w-full bg-z-white py-4 text-lg flex items-center justify-between"
        onClick={download}
      >
        <span>Download</span>
        <Download fill="#202020" />
      </button>
    </div>
  ) : (
    <Image
      src="https://static.cdn.zo.xyz/web-media/bitcoin-bros/placeholder.svg"
      width={350}
      height={545}
      alt="Placeholder"
    />
  );
};

export default PhallusCard;
