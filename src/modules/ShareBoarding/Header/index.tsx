import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

export function Header({ scrollY }: { scrollY: SharedValue<number> }) {
  const { t } = useTranslation("", { keyPrefix: "screens.shareOnboard" });

  const handlePress = () => {
    if (router.canGoBack()) return router.back();
    router.navigate("/(main)/(tabs)");
  };

  const titleStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(scrollY.value, [0, 130], [10, 0], "clamp"),
      },
    ],
    opacity: interpolate(scrollY.value, [0, 150], [0, 1], "clamp"),
  }));

  return (
    <View style={styles.conatiner}>
      <View style={styles.wrapper}>
        <Pressable style={styles.backButton} onPress={handlePress}>
          <FontAwesome6 name="arrow-left" size={24} color="white" />
        </Pressable>
        <View style={styles.titleContainer}>
          <Animated.Text style={[styles.title, titleStyle]} numberOfLines={1}>
            {t("title")}
          </Animated.Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    position: "relative",
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  wrapper: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
    overflow: "hidden",
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    width: "100%",
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: 18,
    wordWrap: "wrap",
    overflow: "hidden",
    textOverflow: "elipsis",
    color: "white",
  },
  backButton: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },
});
