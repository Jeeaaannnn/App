import { View, StyleSheet, Dimensions, Text } from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import { cardList } from "@/src/config/onboarding";

// TODO: set types.

interface IProps {
  position: SharedValue<number>;
  offset: SharedValue<number>;
}

const { width } = Dimensions.get("window");

export function HeaderCarousel(props: IProps) {
  const { offset, position } = props;
  const opacityInput = [0, 0.5, 0.99];
  const translateXInput = [0, cardList.length];

  const translateX = useDerivedValue(() =>
    interpolate(
      position.value + offset.value,
      translateXInput,
      [0, cardList.length * -width],
      "clamp"
    )
  );

  const opacity = useDerivedValue(() =>
    interpolate(offset.value, opacityInput, [1, 0, 1], "clamp")
  );

  const wrapperStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.wrapper, wrapperStyle]}>
        {cardList.map((el, index) => (
          <Animated.View style={{ width }} key={index}>
            <Text style={styles.discoverText}>{el.head}</Text>
            <Text style={[styles.headText]}>{el.title}</Text>
            <Text style={[styles.descriptionText]}>{el.description}</Text>
          </Animated.View>
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 245,
    alignItems: "center",
  },
  wrapper: {
    flexDirection: "row",
    width,
  },
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  discoverText: {
    fontFamily: "Poppins",
    fontWeight: "400",
    fontSize: 28,
    color: "white",
    textAlign: "center",
  },
  headText: {
    fontFamily: "Poppins",
    fontWeight: "700",
    fontSize: 28,
    color: "white",
    textAlign: "center",
  },
  descriptionText: {
    fontFamily: "Poppins",
    fontWeight: "400",
    fontSize: 18,
    lineHeight: 30,
    color: "white",
    textAlign: "center",
    paddingHorizontal: 10,
  },
});
