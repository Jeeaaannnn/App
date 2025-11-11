import { IosBezier } from "@/config/animations";
import { Case } from "@/interfaces/case.interface";
import { percTwoDateNow } from "@/utils/date";
import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  ViewStyle,
  LayoutChangeEvent,
} from "react-native";
import Animated, {
  Easing,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

interface IProgressBarProps {
  selected: { type: string; data: Case | null } | null;
  loading: boolean;
  containerStyle?: ViewStyle;
}

const LayourCustom = LinearTransition.easing(Easing.bezierFn(0.32, 0.72, 0, 1));

export function ProgressBar(props: IProgressBarProps) {
  const layoutRef = useRef<{ width: number; height: number } | null>(null);
  const widthShared = useSharedValue(0);

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    layoutRef.current = e.nativeEvent.layout;
  }, []);

  const getPercentage = useCallback(() => {
    if (!props.selected || !props.selected.data)
      return { percentage: 0, months: 0 };
    const months = props.selected.data.instalmentsNumber;
    const from = props.selected.data.from;
    const fromDate = new Date(Date.parse(from));
    const toDate = new Date(fromDate.setMonth(fromDate.getMonth() + months));
    const percentage = percTwoDateNow(toDate.getTime());
    return { percentage, months };
  }, [props]);

  const { percentage, months } = useMemo(() => getPercentage(), [props]);

  const handleAnimate = useCallback(() => {
    if (!props.selected || !props.selected.data || !layoutRef.current) {
      widthShared.value = 0;
      return;
    }
    const { width } = layoutRef.current;
    widthShared.value = withDelay(
      300,
      withTiming((percentage * width) / 100, {
        duration: 500,
        easing: IosBezier,
      })
    );
  }, [percentage, layoutRef]);

  useEffect(() => {
    handleAnimate();
  }, [handleAnimate]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: widthShared.value,
  }));

  if (!props.selected || !props.selected.data) return;

  return (
    <Animated.View
      layout={LayourCustom.springify(150)}
      style={[styles.container]}
    >
      <Text style={styles.header}>Durata {months} mesi</Text>
      <View style={styles.progressContainer} onLayout={handleLayout}>
        <Text style={styles.progressIndicatorText}>{percentage ?? 0}%</Text>
        <Animated.View style={[styles.progressIndicator, animatedStyle]} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    overflow: "hidden",
    flexDirection: "column",
    gap: 5,
  },
  header: {
    fontSize: 14,
    fontFamily: "Poppins",
    fontWeight: "600",
  },
  progressContainer: {
    width: "100%",
    height: 40,
    backgroundColor: "#F5F5F5",
    borderRadius: 7,
    overflow: "hidden",
    justifyContent: "center",
  },
  progressIndicator: {
    position: "absolute",
    left: 0,
    bottom: 0,
    top: 0,
    backgroundColor: "#FBB040",
  },
  progressIndicatorText: {
    zIndex: 10,
    fontSize: 16,
    color: "black",
    fontFamily: "Poppins",
    fontWeight: "700",
    textAlign: "center",
  },
});
