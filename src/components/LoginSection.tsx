import { useWalletAuthentication } from "@/hooks";
import Image from "next/image";
import React from "react";

interface LoginSectionProps {}

const LoginSection: React.FC<LoginSectionProps> = () => {
  const { openConnectModal } = useWalletAuthentication();

  return (
    <>
      <button
        className="bg-zinc-100 py-4 px-4 mt-12 lg:px-8 flex items-center space-x-4"
        onClick={openConnectModal}
      >
        <Image
          src="https://static.cdn.zo.xyz/app-media/logos/bitcoin.svg"
          width={24}
          height={24}
          alt="bitcoin"
        />
        <span className="font-medium text-black">
          Connect Bitcoin Ordinals Wallet
        </span>
      </button>
    </>
  );
};

export default LoginSection;
