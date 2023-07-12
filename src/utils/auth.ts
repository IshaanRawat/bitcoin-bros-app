import { AuthUser } from "../..";
import { isValidObject } from "./object";
import { isValidString } from "./string";

const getDeviceId = () => {
  const navigator_info = window.navigator;
  const screen_info = window.screen;
  let uid = navigator_info.mimeTypes.length?.toString();
  uid += navigator_info.userAgent.replace(/\D+/g, "");
  uid += screen_info.height || "";
  uid += screen_info.width || "";
  uid += screen_info.pixelDepth || "";
  uid += navigator.platform.replace(/\D+/g, "") || "";
  uid += navigator.getGamepads()?.length || "";
  uid += navigator_info.languages.length || "";
  uid += navigator_info.hardwareConcurrency || "";
  uid += navigator_info.maxTouchPoints || "";
  return uid;
};

const getUserIfExists = (user: string | null) => {
  try {
    if (user != null && isValidString(user)) {
      const parsedUser: AuthUser = JSON.parse(user);
      if (isValidObject(parsedUser)) {
        return parsedUser;
      }
    }
    return null;
  } catch (e) {
    return null;
  }
};

const formatAddress = (address: string) =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;

const isPaymentAddress = (address: string) => {
  if (address.startsWith("3") || address.startsWith("2")) {
    return true;
  }
  return false;
};

export { formatAddress, getDeviceId, getUserIfExists, isPaymentAddress };
