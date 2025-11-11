import { createContext, Dispatch, SetStateAction } from "react";

interface IUserContext {
  loading: boolean;
  userData: IUserData | null;
  setUserData: Dispatch<SetStateAction<IUserData | null>>;
  storeUserData: (data: any) => Promise<void>;
  removeUserData: () => Promise<void>;
}

const IUserContext: IUserContext = {
  loading: false,
  userData: null,
  setUserData: () => {},
  storeUserData: async () => {},
  removeUserData: async () => {},
};

export const UserContext = createContext<IUserContext>(IUserContext);
// TODO:
