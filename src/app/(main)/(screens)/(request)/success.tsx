import LottieView from "lottie-react-native";
import sentAnimation from "@/assets/lottie/sent.json";
import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export default function Success() {
  const { t } = useTranslation("", { keyPrefix: "screens.successRequest" });

  const onFinish = useCallback(async () => {
    await new Promise((resolve, reject) => setTimeout(() => resolve(""), 5000));
    router.dismissTo("/(main)/(tabs)");
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={sentAnimation}
        style={styles.lottie}
        resizeMode="cover"
        speed={1}
        autoPlay
        loop={false}
        onAnimationFinish={onFinish}
      />
      <Text style={styles.title}>{t("title")}</Text>
      <Text style={styles.description}>{t("description")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#F37021",
    alignItems: "center",
    justifyContent: "center",
  },
  lottie: {
    width: "100%",
    height: "50%",
  },
  title: {
    color: "white",
    fontFamily: "Poppins",
    fontWeight: "700",
    fontSize: 24,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  description: {
    fontFamily: "Poppins",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 20,
    color: "white",
  },
});
