import axios from "axios";
import { useRouter } from "next/router";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useQueryClient } from "react-query";
import AuthContext from "./Context";

interface AuthProviderProps extends PropsWithChildren {}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const localToken = localStorage.getItem("bb-token");
    const token = params.get("token") || localToken;

    if (token) {
      login(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = useCallback(async () => {
    setLoggedIn(false);

    queryClient.clear();
    queryClient.removeQueries();
    queryClient.invalidateQueries();
    queryClient.resetQueries();

    localStorage.clear();

    const customAxiosHeaders = axios.defaults.headers;
    delete customAxiosHeaders.Authorization;

    axios.defaults.headers = customAxiosHeaders;
  }, [queryClient]);

  const login = (token: string) => {
    const customAxiosHeaders: any = {
      ...axios.defaults.headers,
      Authorization: `Bearer ${token}`,
    };

    localStorage.setItem("bb-token", token);
    axios.defaults.headers = customAxiosHeaders;
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          logout();
          router.push("/");
        }
        return Promise.reject(error);
      }
    );
    router.push("/");
    setLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        logout,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
