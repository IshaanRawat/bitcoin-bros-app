import React from "react";
import { GeneralObject } from "../..";
import Button from "./Button";

interface MintSuccessInfoProps {
  mintStatus: GeneralObject;
}

const MintSuccessInfo: React.FC<MintSuccessInfoProps> = ({ mintStatus }) => {
  const openOrdinal = () => {
    window.open(
      `https://magiceden.io/ordinals/item-details/${mintStatus.ordinal_id}`,
      "_blank"
    );
  };

  return (
    <div className="flex-1 flex flex-col justify-center">
      <h1 className="text-3xl lg:text-6xl font-bold">
        Get ready to hold your phallus ✊
      </h1>
      <div className="w-80 mt-8">
        <Button
          imageSrc="https://static.cdn.zo.xyz/web-media/bitcoin-bros/magiceden.svg"
          onClick={openOrdinal}
        >
          View your Phallus
        </Button>
      </div>
      <p className="text-base lg:text-lg mt-12">
        With super excitement, we&apos;ve
        <br />
        tweeted your inscribed phallus.
      </p>
    </div>
  );
};

export default MintSuccessInfo;
