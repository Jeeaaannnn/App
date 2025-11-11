import { useCallback } from "react";
import {
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import Animated, { useAnimatedStyle } from "react-native-reanimated";

export function Button(props: {
  loading?: boolean;
  label: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  onPress?: () => void;
}) {
  const config = {
    label: props.label ?? "",
    textStyle: props.textStyle ?? {},
    containerStyle: props.containerStyle ?? {},
    onPress: props.onPress ?? (() => null),
  };

  const handlePress = useCallback(() => {
    if (props.loading || !config.onPress) return;
    config.onPress();
  }, [props.loading, config.onPress]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: props.loading ? 0 : 1,
  }));

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.85}
      style={[styles.buttonElement, config.containerStyle]}
    >
      <Animated.Text
        style={[styles.buttonText, config.textStyle, containerStyle]}
      >
        {props.label}
      </Animated.Text>
      {props.loading && (
        <ActivityIndicator
          style={{ position: "absolute", zIndex: 10 }}
          size={"large"}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonElement: {
    minWidth: "60%",
    height: 50,
    borderRadius: 35,
    paddingHorizontal: 35,
    alignSelf: "center",
    backgroundColor: "#F37021",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    paddingTop: 4,
    fontFamily: "Poppins",
    fontWeight: "600",
    color: "white",
  },
});
