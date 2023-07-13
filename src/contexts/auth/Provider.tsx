import config from "@/data/config.json";
import { getDeviceId, getUserIfExists } from "@/utils/auth";
import { isValidObject } from "@/utils/object";
import { isValidString } from "@/utils/string";
import axios from "axios";
import { useRouter } from "next/router";
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useQueryClient } from "react-query";
import { AuthUser, BBAxiosHeader } from "../../..";
import AuthContext from "./Context";

interface AuthProviderProps extends PropsWithChildren {}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [deviceSecret, setDeviceSecret] = useState<string | null>(null);
  const [isLoggedIn, setLoggedIn] = useState<boolean | null>(null);

  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    const initialToken = localStorage.getItem(`bb-token`);
    const initialUser = localStorage.getItem(`bb-user`);
    const initialTokenExpiry = localStorage.getItem(`bb-token-expiry`);
    const initialDeviceId = localStorage.getItem(`bb-device-id`);
    const initialDeviceSecret = localStorage.getItem(`bb-device-secret`);

    if (initialUser && isValidString(initialUser)) {
      setUser(getUserIfExists(initialUser));
    }

    let currentDeviceId = initialDeviceId;
    let currentDeviceSecret = initialDeviceSecret;
    if (isValidString(initialDeviceId)) {
      setDeviceId(initialDeviceId);
    } else {
      const _deviceId = getDeviceId();
      localStorage.setItem(`bb-device-id`, _deviceId);
      currentDeviceId = _deviceId;
      console.log("generating device id: ", _deviceId);
      setDeviceId(_deviceId);
    }
    if (isValidString(initialDeviceSecret)) {
      setDeviceSecret(initialDeviceSecret);
    } else {
      const _deviceSecret = window.btoa(Date.now() + (currentDeviceId || ""));
      localStorage.setItem(`bb-device-secret`, _deviceSecret);
      console.log("generating device secret: ", _deviceSecret);
      currentDeviceSecret = _deviceSecret;
      setDeviceSecret(_deviceSecret);
    }
    const customAxiosHeaders: BBAxiosHeader = {
      ...axios.defaults.headers,
      "client-device-id": currentDeviceId || "",
      "client-device-secret": currentDeviceSecret || "",
      "client-key": config.CLIENT_KEY || "",
    };
    if (isValidString(initialTokenExpiry)) {
      const parsedDate = +new Date(initialTokenExpiry || "");
      const parsedUser = getUserIfExists(initialUser);
      if (
        isValidObject(parsedUser) &&
        isValidString(parsedUser?.id) &&
        isValidString(initialToken) &&
        parsedDate > +new Date()
      ) {
        customAxiosHeaders.Authorization = `Bearer ${initialToken}`;
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    } else {
      setLoggedIn(false);
    }
    console.log("Setting device headers:", customAxiosHeaders);
    axios.defaults.headers = customAxiosHeaders as any;
  }, []);

  const logout = () => {
    setLoggedIn(false);
    setUser(null);
    localStorage.clear();
    queryClient.clear();
    queryClient.removeQueries();
    queryClient.invalidateQueries();
    queryClient.resetQueries();
    queryClient.getQueryCache().clear();
    queryClient.getMutationCache().clear();
    const _deviceId = getDeviceId();
    localStorage.setItem(`bb-device-id`, _deviceId);
    console.log("generating device id: ", _deviceId);
    setDeviceId(_deviceId);
    const _deviceSecret = window.btoa(Date.now() + (_deviceId || ""));
    localStorage.setItem(`bb-device-secret`, _deviceSecret);
    console.log("generating device secret: ", _deviceSecret);
    setDeviceSecret(_deviceSecret);
    const customAxiosHeaders: BBAxiosHeader = {
      ...axios.defaults.headers,
      "client-device-id": _deviceId || "",
      "client-device-secret": _deviceSecret || "",
      "client-key": config.CLIENT_KEY || "",
    };
    axios.defaults.headers = customAxiosHeaders as any;
  };

  const login = (user: AuthUser, token: string, validTill: number) => {
    localStorage.setItem(`bb-token`, token);
    localStorage.setItem(`bb-user`, JSON.stringify(user));
    localStorage.setItem(`bb-token-expiry`, String(validTill));
    const customAxiosHeaders: BBAxiosHeader = {
      ...axios.defaults.headers,
      "client-device-id": deviceId || "",
      "client-device-secret": deviceSecret || "",
      "client-key": config.CLIENT_KEY || "",
      Authorization: `Bearer ${token}`,
    };
    console.log("Setting device headers:", customAxiosHeaders);
    axios.defaults.headers = customAxiosHeaders as any;
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 401) {
          logout();
          router.push("/");
        }
        return Promise.reject(error);
      }
    );
    setUser(user);
    setLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
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
