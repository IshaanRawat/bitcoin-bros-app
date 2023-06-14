import axios from "axios";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import AuthContext from "./Context";

interface AuthProviderProps extends PropsWithChildren {}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      login(token);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoggedIn(false);

    sessionStorage.clear();

    const customAxiosHeaders = axios.defaults.headers;
    delete customAxiosHeaders.Authorization;

    axios.defaults.headers = customAxiosHeaders;
  }, []);

  const login = (token: string) => {
    const customAxiosHeaders: any = {
      ...axios.defaults.headers,
      Authorization: `Bearer ${token}`,
    };

    axios.defaults.headers = customAxiosHeaders;
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
