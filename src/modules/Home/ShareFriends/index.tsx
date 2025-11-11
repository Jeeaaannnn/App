import { Text, StyleSheet, View } from "react-native";
import InvitaAmico from "@/assets/svg/invita_amico.svg";
import { useContext, useEffect, useRef } from "react";
import { HomeContext } from "@/src/contexts/Home";
import { router } from "expo-router";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

export function ShareFriends({ show }) {
  const opacity = useSharedValue(1);
  const scale = useSharedValue<number>(1);

  const handlePress = () =>
    router.navigate("/(main)/(screens)/(share)/onboarding");

  const handleLongPress = Gesture.LongPress()
    .onBegin(() => {
      scale.value = withTiming(0.9, {
        duration: 150,
        easing: Easing.bezier(0.32, 0.72, 0, 1),
      });
    })
    .onFinalize(() => {
      scale.value = withTiming(1, {
        duration: 500,
        easing: Easing.bezier(0.32, 0.72, 0, 1),
      });
      scheduleOnRN(handlePress);
    });

  const animatedHeightStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    if (!show) opacity.value = withTiming(0, { duration: 250 });
    else opacity.value = withTiming(1, { duration: 250 });
  }, [show]);

  return (
    <GestureDetector gesture={handleLongPress}>
      <Animated.View style={[styles.wrapper, animatedHeightStyle]}>
        <Animated.View style={styles.content}>
          <Text
            style={{
              fontFamily: "Poppins",
              fontWeight: "600",
              fontSize: 18,
              lineHeight: 24,
            }}
          >
            Presenta un amico{"\n"}e guadagna{" "}
            <Text style={{ fontFamily: "Poppins", fontWeight: "700" }}>
              100€
            </Text>
          </Text>
        </Animated.View>
        <InvitaAmico
          height={125}
          style={{ position: "absolute", right: 0, bottom: 0 }}
        />
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    backgroundColor: "#EFF1FD",
    borderRadius: 20,
    left: 0,
    zIndex: 10,
    marginTop: 20,
    marginBottom: 15,
    // marginHorizontal: 20,
  },
  content: {
    backgroundColor: "white",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
