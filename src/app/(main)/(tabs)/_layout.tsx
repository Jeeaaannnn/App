import { Tabs } from "expo-router";
import TabBar from "@/components/Navigation/TabBar";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false, animation: "none" }}
      tabBar={TabBar}
      initialRouteName="index"
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}
