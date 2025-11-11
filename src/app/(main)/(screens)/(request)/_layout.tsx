import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      initialRouteName="request"
      screenOptions={{ headerShown: false, navigationBarHidden: true }}
    >
      <Stack.Screen name="request" options={{ animation: "ios_from_right" }} />
      <Stack.Screen
        name="success"
        options={{ animation: "slide_from_bottom" }}
      />
    </Stack>
  );
}
