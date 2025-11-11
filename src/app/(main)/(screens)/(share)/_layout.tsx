import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      initialRouteName="share"
      screenOptions={{ headerShown: false, navigationBarHidden: true }}
    >
      <Stack.Screen options={{ animation: "none" }} name="share" />
      <Stack.Screen options={{ animation: "none" }} name="onboarding" />
    </Stack>
  );
}
