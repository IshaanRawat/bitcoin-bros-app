/* eslint-disable @next/next/no-img-element */
import pledges from "@/data/pledges.json";
import Image from "next/image";
import React from "react";

interface PledgesProps {}

const Pledges: React.FC<PledgesProps> = () => {
  return (
    <div className="flex flex-col pt-8">
      <h2 className="font-bold text-2xl text-zinc-100">
        Pledges for Whitelist
      </h2>
      {pledges.map((pledge, index) => (
        <Pledge key={pledge.id} pledge={pledge} />
      ))}
    </div>
  );
};

interface PledgeProps {
  pledge: {
    id: number;
    text: string;
    media: string;
    link: string;
  };
}

const Pledge: React.FC<PledgeProps> = ({ pledge }) => {
  const openLink = () => {
    window.open(pledge.link, "_blank");
  };

  return (
    <div
      className="flex flex-col cursor-pointer max-w-md bg-zinc-900 text-zinc-100 p-4 mt-4"
      onClick={openLink}
    >
      <div className="flex space-x-4">
        <div className="w-12 h-12 flex-shrink-0 bg-[#2daae1] rounded-full overflow-hidden flex items-center justify-center">
          <Image
            src="https://static.cdn.zo.xyz/app-media/logos/bitcoin-bros.jpeg"
            alt="twitter"
            width={48}
            height={48}
          />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">Bitcoin Bros</span>
          <span className="font-medium text-sm text-zinc-300">
            @BitcoinBrosXYZ
          </span>
        </div>
      </div>
      <p
        className="mt-4 whitespace-pre-line pledge"
        dangerouslySetInnerHTML={{ __html: pledge.text }}
      ></p>
      {pledge.media && (
        <div className="mt-4">
          <img
            src={pledge.media}
            alt="pledge"
            className="w-full h-auto rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default Pledges;
