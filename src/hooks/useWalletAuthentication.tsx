import axios from "axios";
import { useEffect } from "react";
import { useMutation } from "react-query";
import config from "./../../config.json";
import useAuth from "./useAuth";
import useWeb3 from "./useWeb3";

const useWalletAuthentication = () => {
  const { openConnectModal, address } = useWeb3();
  const { login, isLoggedIn, logout } = useAuth();

  const { mutate: postAuth, isLoading: isLoadingAuth } = useMutation(
    (data: any) => axios.post(`${config.BASE_API_URL}/api/auth`, data)
  );

  useEffect(() => {
    if (address) {
      postAuth(
        { walletAddress: address },
        {
          onSuccess: (data) => {
            console.log(data);
            login(data.data.token, data.data.tokenExpiry, data.data.user);
          },
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return { isLoggedIn, isLoadingAuth, openConnectModal, logout };
};

export default useWalletAuthentication;
