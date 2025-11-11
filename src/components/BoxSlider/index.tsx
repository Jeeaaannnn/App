import { View, Text, StyleSheet } from "react-native";
import { Slider, SliderProps } from "@miblanchard/react-native-slider";
import Animated from "react-native-reanimated";

interface IBoxSliderProps {
  min: number;
  max: number;
  step: number;
  title: string;
  base: string;
  value: number;
  onChange: (value: number[]) => void;
}

export function BoxSlider(props: IBoxSliderProps) {
  const { min, max, base, step, title, value, onChange } = props;

  const sliderProps: SliderProps = {
    minimumValue: min,
    maximumValue: max,
    step,
    value,
    onValueChange: onChange,
    animationType: "spring",
    thumbTintColor: "#5B83ED",
    minimumTrackTintColor: "#5B83ED",
    maximumTrackTintColor: "#F2F2F2",

    trackStyle: {
      height: 6,
      borderRadius: 0,
    },
    thumbStyle: {
      width: 20,
      height: 20,
      borderRadius: 5,
    },
    containerStyle: {
      height: 25,
    },
  };

  return (
    <View style={styles.sliderContainer}>
      <View style={styles.sliderHeader}>
        <Text style={styles.sliderHeaderTitle}>{title}</Text>
        <View style={styles.sliderWrapper}>
          <Animated.Text style={styles.sliderValue}>{value}</Animated.Text>
          <Text style={styles.sliderBase}>{base}</Text>
        </View>
      </View>
      <View style={styles.sliderContent}>
        <Slider {...sliderProps} />
      </View>
      <View style={styles.sliderFooter}>
        <Text style={styles.sliderFooterText}>
          {min} {base}
        </Text>
        <Text style={styles.sliderFooterText}>
          {max} {base}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    flexDirection: "column",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderColor: "#0000001a",
    borderWidth: 1,
    borderRadius: 10,
  },
  sliderHeader: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  sliderHeaderTitle: {
    fontSize: 18,
    lineHeight: 24,
    color: "#FF8135",
    fontFamily: "Poppins",
    fontWeight: "600",
  },
  sliderContent: {
    position: "relative",
    width: "100%",
    marginTop: 25,
  },
  sliderFooter: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sliderWrapper: {
    gap: 5,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  sliderValue: {
    color: "black",
    fontSize: 34,
    lineHeight: 38,
    fontFamily: "Poppins",
    fontWeight: "600",
    fontVariant: ["tabular-nums"],
  },
  sliderBase: {
    color: "black",
    fontSize: 34,
    lineHeight: 38,
    fontFamily: "Poppins",
    fontWeight: "600",
  },
  sliderFooterText: {
    fontFamily: "Poppins",
    fontWeight: "500",
    opacity: 0.4,
  },
});
