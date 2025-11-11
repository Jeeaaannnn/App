import { Stack } from "expo-router";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MainLayout() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top + (Platform.OS === "ios" ? 5 : 10),
        backgroundColor: "#F37021",
      }}
    >
      <Stack
        initialRouteName="(tabs)"
        screenOptions={{
          headerShown: false,
          navigationBarHidden: true,
          animationMatchesGesture: true,
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            animation: "ios_from_right",
          }}
        />
        <Stack.Screen
          name="(screens)"
          options={{
            animation: "ios_from_right",
          }}
        />
        <Stack.Screen
          name="(user)"
          options={{
            animation: "ios_from_left",
          }}
        />
      </Stack>
    </View>
  );
}
