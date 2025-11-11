import { JSX, useCallback, useEffect, useState } from "react";
import { UserContext } from "./context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { tryCatch } from "@/src/utils/store";

// TODO: into configuration file
const KEY = "user";

export function UserProvider({ children }: { children: JSX.Element }) {
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const storeUserData = useCallback(async (data: IUserData) => {
    setUserData(data);
    const stringifyData = JSON.stringify(data);
    await tryCatch(AsyncStorage.setItem(KEY, stringifyData));
  }, []);

  const removeUserData = useCallback(async () => {
    setUserData(null);
    await tryCatch(AsyncStorage.removeItem(KEY));
  }, []);

  const loadUserData = useCallback(async () => {
    const [error, result] = await tryCatch<string | null>(
      AsyncStorage.getItem(KEY)
    );

    if (!error && typeof result === "string") {
      const jsonResult: IUserData = JSON.parse(result);
      setUserData(jsonResult);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        loading,
        userData,
        setUserData,
        storeUserData,
        removeUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
