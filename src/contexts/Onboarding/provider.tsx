import { JSX, useCallback, useEffect, useState } from "react";
import { OnboardingContext } from "./context";
import { tryCatch } from "@/src/utils/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function OnboardingProvider({ children }: { children: JSX.Element }) {
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleSetOnboarded = useCallback(async () => {
    await tryCatch(AsyncStorage.setItem("onboarded", "true"));
    setHasOnboarded(true);
  }, []);

  const handleStorageLoad = useCallback(async () => {
    // await AsyncStorage.clear();
    const [error, result] = await tryCatch(AsyncStorage.getItem("onboarded"));
    if (!error && result === "true") setHasOnboarded(true);
    setLoading(false);
  }, []);

  useEffect(() => {
    handleStorageLoad();
  }, []);

  return (
    <OnboardingContext.Provider
      value={{
        loading,
        hasOnboarded,
        setHasOnboarded,
        handleSetOnboarded,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}
