import Image from "next/image";
import React from "react";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="h-16 flex-shrink-0 relative lg:fixed lg:right-8 lg:bottom-8">
      <div className="flex items-center space-x-8 justify-center lg:justify-end h-full">
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
          href="https://discord.gg/DFXmWrMEZA"
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
    </footer>
  );
};

export default Footer;
