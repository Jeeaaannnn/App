import { StyleSheet } from "react-native";
import TabElement from "../TabElement";
import { TabBarContext } from "../context/TabBar/context";
import { TabBarTrigger } from "../TabBarTrigger";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Animated, { LinearTransition } from "react-native-reanimated";

export default function TabBar(props: BottomTabBarProps) {
  return (
    <TabBarContext.Provider value={{ props }}>
      <Animated.View layout={LinearTransition} style={[styles.container]}>
        <TabBarTrigger name="index" href="/(main)/(tabs)">
          <TabElement icon="home" name="Home" />
        </TabBarTrigger>
        <TabBarTrigger name="settings" href="/(main)/(tabs)/settings">
          <TabElement icon="headset-outline" name="Parla con noi" />
        </TabBarTrigger>
      </Animated.View>
    </TabBarContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 25,
    padding: 15,
    paddingBottom: 15 + 10,
    backgroundColor: "#FFFFFF",
    zIndex: 5,
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 2,
        blurRadius: 10,
        spreadDistance: -7,
        color: "black",
      },
    ],
  },
});
