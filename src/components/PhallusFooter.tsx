import Image from "next/image";
import React from "react";

interface PhallusFooterProps {}

const PhallusFooter: React.FC<PhallusFooterProps> = () => {
  return (
    <footer className="flex-shrink-0 relative">
      <div className="max-w-6xl w-full mx-auto pt-8 lg:pt-0 pb-8 px-8">
        <div className="flex items-center space-x-8 justify-center lg:justify-end h-full">
          <a
            href="https://magiceden.io/ordinals/marketplace/bip-666"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center rounded-full text-zinc-100"
          >
            <Image
              src="https://static.cdn.zo.xyz/web-media/bitcoin-bros/magiceden-white.svg"
              width={24}
              height={24}
              alt="Magic Eden"
            />
          </a>
          <a
            href="https://twitter.com/BitcoinBrosXYZ?utm_medium=website&utm_source=bitcoinbros"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center rounded-full text-zinc-100"
          >
            <Image
              src="https://static.cdn.zo.xyz/app-media/logos/twitter.svg"
              width={24}
              height={24}
              alt="Twitter"
            />
          </a>
          <a
            href="https://discord.gg/thezoworld"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center rounded-full text-zinc-100"
          >
            <Image
              src="https://static.cdn.zo.xyz/app-media/logos/discord.svg"
              width={24}
              height={24}
              alt="Discord"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default PhallusFooter;
