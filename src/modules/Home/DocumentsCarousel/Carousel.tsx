import {
  Children,
  JSX,
  cloneElement,
  useCallback,
  useMemo,
  useState,
} from "react";
import { LayoutChangeEvent, LayoutRectangle, StyleSheet } from "react-native";
import Animated, { Easing, LinearTransition } from "react-native-reanimated";

export interface Icon {
  name?: string;
  size?: number;
  color?: string;
}

interface IProps {
  itemPerPage?: number;
  children: JSX.Element | JSX.Element[];
}

const LayoutCustom = LinearTransition.easing(Easing.bezierFn(0.32, 0.72, 0, 1));

export function Carousel(props: IProps): JSX.Element {
  const [itemCount, setItemCount] = useState<number>(props.itemPerPage ?? 3.5);
  const [layout, setLayout] = useState<LayoutRectangle | null>(null);

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    setLayout(e.nativeEvent.layout);
  }, []);

  const itemSize = useMemo<{ width: number } | null>(() => {
    if (!layout) return null;
    const width = layout.width / itemCount;

    return { width };
  }, [layout]);

  return (
    <Animated.ScrollView
      onLayout={handleLayout}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      layout={LayoutCustom.springify(150)}
      horizontal
    >
      {Children.map(props.children, (child) =>
        cloneElement(child, { itemSize })
      )}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    marginVertical: 10,
    marginTop: 20,
  },
});
