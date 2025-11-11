import { PropsWithChildren } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";

interface IProps extends PropsWithChildren {
  style?: ViewStyle;
}

export function HeaderLayout({ children, style }: IProps) {
  return (
    <Animated.View
      sharedTransitionTag="header"
      style={[styles.container, style]}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});
