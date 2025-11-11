import { router } from "expo-router";
import { Text, StyleSheet, Pressable } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

export function ContinueButton({ scrollY }: { scrollY: SharedValue<number> }) {
  const handlePress = () => router.navigate("/(main)/(screens)/(share)");

  const containerStyle = useAnimatedStyle(() => {
    "worklet";

    return {
      bottom: interpolate(
        scrollY.value,
        [0, 280],
        [-60, 30],
        Extrapolation.CLAMP
      ),
    };
  });

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Pressable onPress={handlePress} style={styles.wrapper}>
        <Text style={styles.label}>Presenta amici</Text>
      </Pressable>
    </Animated.View>
  );
}

// TODO: FIX ??
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 20,
    right: 20,
  },
  wrapper: {
    backgroundColor: "#2FAF3E",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
  },
  label: {
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 24,
    color: "white",
  },
});
