import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  Easing,
  LinearTransition,
} from "react-native-reanimated";

interface IProps {
  icon: keyof typeof Ionicons.glyphMap;
  name: string;
  width?: number;
  isFocused?: boolean;
  onPress?: () => void;
}

export default function TabBarElement(props: IProps) {
  const { icon, name, isFocused, onPress } = props;

  const animatedBackgroundStyle = useAnimatedStyle(() => ({
    backgroundColor: isFocused
      ? withTiming("#f37221bf", { duration: 250 })
      : withTiming("transparent", { duration: 250 }),
  }));

  return (
    <Animated.View
      onTouchEnd={onPress}
      layout={LinearTransition}
      style={[styles.container]}
    >
      <Animated.View style={[styles.background, animatedBackgroundStyle]}>
        <Ionicons
          color={isFocused ? "#ffffffff" : "#898989"}
          name={icon}
          size={28}
          style={{ marginBottom: -2 }}
        />
      </Animated.View>
      <Animated.Text numberOfLines={1} style={[styles.label]}>
        {name}
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 100,
    minWidth: 100,
  },
  label: {
    color: "#898989",
    fontFamily: "Poppins",
    fontWeight: "400",
    textAlign: "center",
    justifyContent: "center",
    fontSize: 14,
    lineHeight: 20,
    wordWrap: "nowrap",
  },
  background: {
    width: 65,
    height: 35,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
