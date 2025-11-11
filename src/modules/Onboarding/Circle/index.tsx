import { cardList } from "@/src/config/onboarding";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";

interface IProps {
  position: SharedValue<number>;
  offset: SharedValue<number>;
}

const { width } = Dimensions.get("window");

export function Circle(props: IProps) {
  const { offset, position } = props;

  const scale = useDerivedValue(() =>
    interpolate(offset.value, [0, 0.5, 0.99], [1, 0, 1], "clamp")
  );

  const opacity = useDerivedValue(() =>
    interpolate(offset.value, [0, 0.5, 0.99], [1, 0, 1], "clamp")
  );

  const translateX = useDerivedValue(() =>
    interpolate(
      position.value + offset.value,
      [0, cardList.length],
      [0, cardList.length * -width],
      "clamp"
    )
  );

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }],
  }));

  const elementStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <>
      <View style={styles.background}></View>
      <Animated.View style={[styles.container, containerStyle]}>
        {cardList.map(({ Svg }, index) => (
          <Animated.View key={index} style={[styles.element, elementStyle]}>
            <Svg width={250} height={250} />
          </Animated.View>
        ))}
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    width: 248,
    height: 248,
    top: "35%",
    left: "50%",
    transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
    borderRadius: "100%",
    backgroundColor: "#DFF5F7",
  },
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "70%",
    flexDirection: "row",
  },
  element: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});
