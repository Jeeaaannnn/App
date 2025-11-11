import { ScrollView } from "react-native";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "none" }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="new-password" />
      <Stack.Screen name="reset-password" />
      <Stack.Screen name="security-pin" />
      <Stack.Screen
        name="success"
        options={{ animation: "slide_from_bottom" }}
      />
    </Stack>
  );
}
