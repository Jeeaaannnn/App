import "react-native-reanimated";
import "@/i18n";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { JSX, useContext, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { OnboardingProvider, OnboardingContext } from "../contexts/Onboarding";
import { AuthContext, AuthProvider } from "../contexts/Auth";
import { UserContext, UserProvider } from "../contexts/User";
import { StatusBar } from "react-native";
import { OneSignal, LogLevel } from "react-native-onesignal";

SplashScreen.setOptions({ fade: true });
SplashScreen.preventAutoHideAsync();

function SplashScreenProvider({ children }: { children: JSX.Element }) {
  const { loading: onboardLoading } = useContext(OnboardingContext);
  const { loading: authLoading } = useContext(AuthContext);
  const { loading: userLoading } = useContext(UserContext);

  useEffect(() => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    OneSignal.initialize("08f72527-dae5-45e6-8ed1-d9ac40c51416");
    OneSignal.Notifications.requestPermission(true);
  }, []);

  useEffect(() => {
    if (!onboardLoading && !authLoading && !userLoading) {
      SplashScreen.hideAsync();
    }
  }, [onboardLoading, authLoading, userLoading]);

  if (onboardLoading || authLoading || userLoading) return null;
  return children;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <StatusBar backgroundColor="transparent" barStyle="light-content" />
      <OnboardingProvider>
        <AuthProvider>
          <UserProvider>
            <SplashScreenProvider>
              <RootNavigator />
            </SplashScreenProvider>
          </UserProvider>
        </AuthProvider>
      </OnboardingProvider>
    </GestureHandlerRootView>
  );
}

function RootNavigator() {
  const { hasOnboarded } = useContext(OnboardingContext);
  const { isAuth } = useContext(AuthContext);

  return (
    <Stack screenOptions={{ headerShown: false, navigationBarHidden: true }}>
      <Stack.Protected guard={!hasOnboarded}>
        <Stack.Screen name="onboarding" options={{ animation: "none" }} />
      </Stack.Protected>
      <Stack.Protected guard={hasOnboarded && !isAuth}>
        <Stack.Screen name="(auth)" options={{ animation: "none" }} />
      </Stack.Protected>

      <Stack.Protected guard={isAuth && hasOnboarded}>
        <Stack.Screen name="(main)" options={{ animation: "none" }} />
      </Stack.Protected>
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
