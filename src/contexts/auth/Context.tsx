import { createContext } from "react";

export const EMPTY = {
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
};

interface AuthContextInterface {
  isLoggedIn: boolean;
  login: (token: string, tokenExpiry: string, user: GeneralObject) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextInterface>(EMPTY);

export default AuthContext;
