import { PropsWithChildren } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import Animated from "react-native-reanimated";

interface IProps extends PropsWithChildren {
  style?: ViewStyle;
  contentStyle?: ViewStyle;
}

export function ContainerLayout({ children, style, contentStyle }: IProps) {
  return (
    <View style={[styles.container, style]}>
      <Animated.ScrollView
        scrollEnabled
        sharedTransitionTag="container"
        style={{ flex: 1 }}
        contentContainerStyle={[styles.content, contentStyle]}
      >
        {children}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  content: {
    paddingTop: 80,
    paddingBottom: 20,
    paddingHorizontal: 30,
  },
});
