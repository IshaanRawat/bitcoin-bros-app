import queries from "@/utils/queries";
import { useMemo } from "react";
import { useQuery } from "react-query";
import useAuth from "./useAuth";

const useUser = () => {
  const { isLoggedIn } = useAuth();

  const {
    data: userData,
    refetch: refetchUser,
    isFetching: isFetchingMe,
    isLoading: isLoadingMe,
  } = useQuery(["me"], queries.PROFILE_ME, {
    enabled: isLoggedIn == true,
    refetchOnMount: false,
    refetchOnWindowFocus: true,
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
