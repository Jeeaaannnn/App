import { FC, JSX, useEffect } from "react";
import { SvgProps } from "react-native-svg";
import { View, StyleSheet, Text, ViewStyle } from "react-native";
import Animated, { Easing, LinearTransition } from "react-native-reanimated";

interface IProps {
  icon: FC<SvgProps>;
  title: string;
  description: string;
  expandable?: boolean;
  expandData?: {
    title: string;
    description: string;
    subDescription: string;
  };
  content: JSX.Element;
  style?: ViewStyle;
}

const LayourCustom = LinearTransition.easing(Easing.bezierFn(0.32, 0.72, 0, 1));

export function Card(props: IProps) {
  const Icon = props.icon;

  // const exiting = new Keyframe({
  //   0: { opacity: 1, height: 165 },
  //   10: { opacity: 1, height: 83, easing: Easing.bezier(0.32, 0.72, 0, 1) },
  //   50: { opacity: 0.5, height: 57 },
  //   100: { opacity: 0, height: 0 },
  // }).duration(350);

  // const entering = new Keyframe({
  //   0: { opacity: 0, height: 30, easing: Easing.bezier(0.32, 0.72, 0, 1) },
  //   10: { opacity: 0.2, height: 57 },
  //   50: { opacity: 0.5, height: 83 },
  //   100: { opacity: 1, height: 165 },
  // }).duration(350);

  return (
    <Animated.View style={[styles.container, props.style]}>
      <View style={styles.wrapper}>
        <View style={styles.iconContainer}>
          <View style={styles.iconWrapper}>
            <Icon
              fill={"black"}
              width={125}
              height={125}
              style={{ transform: [{ rotate: "-10deg" }] }}
            />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ gap: 5 }}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.description}>{props.description}</Text>
          </View>
          {props.content}
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: "100%",
    alignSelf: "flex-start",
    backgroundColor: "white",
    borderRadius: 20,
    height: 165,
    flexDirection: "row",
    overflow: "hidden",
  },
  wrapper: {
    flexDirection: "row",
    width: "100%",
    flex: 1,
    gap: 15,
    height: 165,
    paddingHorizontal: 15,
    paddingVertical: 15,
    paddingTop: 20,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 125,
  },
  iconWrapper: {
    width: 120,
    height: 120,
    borderRadius: 100,
    overflow: "visible",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DFF5F7",
  },
  title: {
    fontFamily: "Poppins",
    fontWeight: "600",
    color: "#343434",
    lineHeight: 26,
    fontSize: 20,
    opacity: 0.76,
  },
  description: {
    fontSize: 14,
    lineHeight: 18,
    color: "#343434",
    opacity: 0.76,
    fontFamily: "Poppins",
    fontWeight: "500",
  },
});
