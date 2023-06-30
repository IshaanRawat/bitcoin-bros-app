import axios from "axios";
import { useMemo } from "react";
import { useQuery } from "react-query";
import config from "./../../config.json";
import useAuth from "./useAuth";

const useUser = () => {
  const { isLoggedIn } = useAuth();

  const {
    data: userData,
    refetch: refetchUser,
    isFetching: isFetchingMe,
    isLoading: isLoadingMe,
  } = useQuery(["me"], () => axios.get(`${config.BASE_API_URL}/api/me`), {
    enabled: isLoggedIn == true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const user = useMemo(() => userData?.data, [userData]);

  return {
    user,
    refetchUser,
    isFetchingMe,
    isLoadingMe,
  };
};

export default useUser;
