import { createContext, Dispatch, SetStateAction } from "react";

interface IAuthContext {
  loading: boolean;
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  handleSetAuth: (data: any) => Promise<void>;
  removeAuth: () => Promise<void>;
}

const IAuthContext: IAuthContext = {
  loading: false,
  isAuth: false,
  setIsAuth: () => {},
  handleSetAuth: async () => {},
  removeAuth: async () => {},
};

export const AuthContext = createContext<IAuthContext>(IAuthContext);
