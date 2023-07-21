import { useAuth, useUser, useWeb3 } from "@/hooks";
import { SignOut } from "@/icons";
import { formatAddress } from "@/utils/auth";
import Image from "next/image";
import React from "react";
import Loading from "./Loading";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { user, isFetchingMe, isLoadingMe } = useUser();
  const { logout, isLoggedIn } = useAuth();
  const { disconnect } = useWeb3();

  const signout = () => {
    disconnect();
    logout();
  };

  return (
    <header className="flex-shrink-0 p-4 relative flex justify-between pointer-events-none">
      <Image
        src="https://static.cdn.zo.xyz/app-media/animojis/zobitcoin.gif"
        alt="zo"
        width={48}
        height={48}
      />
      {isLoggedIn && user?.wallet_address ? (
        <div className="flex items-center space-x-4 pointer-events-auto">
          <Image
            src="https://static.cdn.zo.xyz/app-media/logos/bitcoin.svg"
            width={24}
            height={24}
            alt="bitcoin"
          />
          <span className="font-medium text-zinc-50">
            {formatAddress(user.wallet_address)}
          </span>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full"
            onClick={signout}
          >
            <SignOut className="w-6 h-6 fill-red-500" />
          </button>
        </div>
      ) : null}

      {(isFetchingMe || isLoadingMe) && <Loading />}
    </header>
  );
};

export default Header;
