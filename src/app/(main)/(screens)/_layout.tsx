import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, navigationBarHidden: true }}>
      <Stack.Screen name="(request)" />
      <Stack.Screen name="(share)" />
    </Stack>
  );
}
