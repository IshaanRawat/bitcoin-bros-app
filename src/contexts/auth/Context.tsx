import { createContext } from "react";
import { AuthUser } from "../../..";

export const EMPTY = {
  isLoggedIn: null,
  user: null,
  login: () => {},
  logout: () => {},
  showLoginModal: () => {},
};

interface AuthContextInterface {
  isLoggedIn: boolean | null;
  logout: () => void;
  login: (user: AuthUser, token: string, validTill: number) => void;
  user: AuthUser | null;
}

const AuthContext = createContext<AuthContextInterface>(EMPTY);

export default AuthContext;
