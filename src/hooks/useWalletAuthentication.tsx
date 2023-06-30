import axios from "axios";
import { useEffect } from "react";
import { useMutation } from "react-query";
import config from "./../../config.json";
import useAuth from "./useAuth";
import useWeb3 from "./useWeb3";

const useWalletAuthentication = () => {
  const { openConnectModal, address, isConnected, signMessage } = useWeb3();
  const { login, isLoggedIn, logout } = useAuth();

  const { mutate: postAuth, isLoading: isLoadingAuth } = useMutation(
    (data: any) =>
      axios.post(`${config.BASE_API_URL}/api/v1/auth/login/web3/`, data)
  );

  useEffect(() => {
    console.log("isConnected", isConnected);
    if (isConnected) {
      setTimeout(async () => {
        const signature = await signMessage(config.AUTH_SIGN_MESSAGE);
        console.log("signature", signature);
        if (signature) {
          postAuth(
            {
              wallet_address: address.payment,
              signature,
              message: config.AUTH_SIGN_MESSAGE,
            },
            {
              onSuccess: (data) => {
                login(data.data.user, data.data.token, data.data.valid_till);
              },
            }
          );
        }
      }, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return { isLoggedIn, isLoadingAuth, openConnectModal, logout };
};

export default useWalletAuthentication;
