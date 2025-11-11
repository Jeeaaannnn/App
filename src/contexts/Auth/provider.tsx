import { JSX, useCallback, useEffect, useState } from "react";
import { AuthContext } from "./context";
import { tryCatch } from "@/src/utils/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

// TODO: transfer to config
const KEY = "auth";

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  const handleSetAuth = useCallback(async (data: any) => {
    setIsAuth(true);
    await Promise.all([
      tryCatch(AsyncStorage.setItem(KEY, JSON.stringify(data))),
      SecureStore.setItemAsync("token", data.token),
    ]);
  }, []);

  const removeAuth = useCallback(async () => {
    setIsAuth(false);
    await Promise.all([
      tryCatch(AsyncStorage.removeItem(KEY)),
      SecureStore.deleteItemAsync("token"),
    ]);
  }, []);

  const handleStorageLoad = useCallback(async () => {
    const [error, result] = await tryCatch(AsyncStorage.getItem("auth"));
    if (!error && result) setIsAuth(true);
    setLoading(false);
  }, []);

  useEffect(() => {
    handleStorageLoad();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        isAuth,
        setIsAuth,
        handleSetAuth,
        removeAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
