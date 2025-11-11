import { StyleSheet, View, Text, Pressable } from "react-native";
import { useCallback, useState } from "react";
import { BoxSlider } from "@/components/BoxSlider";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Animated, {
  EntryAnimationsValues,
  ExitAnimationsValues,
  withTiming,
} from "react-native-reanimated";
import helpersApi from "@/utils/api/helpers.api";
import { useTranslation } from "react-i18next";
import * as requestConfig from "@/config/request";

const animationDistance = 100;
const animationDuration = 300;

const entering = (values: EntryAnimationsValues) => {
  "worklet";

  const animations = {
    originY: withTiming(values.targetOriginY, {
      duration: animationDuration,
    }),
    opacity: withTiming(1, { duration: 350 }),
  };
  const initialValues = {
    originY: values.targetOriginY - animationDistance,
    opacity: 0,
  };
  return { initialValues, animations };
};

const exiting = (values: ExitAnimationsValues) => {
  "worklet";

  const animations = {
    originY: withTiming(values.currentOriginY + animationDistance, {
      duration: animationDuration,
    }),
    opacity: withTiming(0, { duration: 300 }),
  };
  const initialValues = { originY: values.currentOriginY, opacity: 1 };
  return { initialValues, animations };
};

export default function LoanRequest() {
  const { t } = useTranslation("", { keyPrefix: "screens.newRequest" });
  const { t: gT } = useTranslation("", { keyPrefix: "general.words" });
  const [duration, setDuration] = useState(requestConfig.defaultDuration);
  const [amount, setAmount] = useState(requestConfig.defaultAmount);
  const abortController = new AbortController();

  const handleDurationChange = (value: number[]) => setDuration(value[0]);
  const handleAmountChange = (value: number[]) => setAmount(value[0]);

  const handleRequest = useCallback(async () => {
    const result = await helpersApi.requestQuote(
      abortController,
      amount,
      duration
    );

    // // TODO: handle errors
    // if (!result.status) {
    //   // ERROR
    //   return;
    // }
    router.navigate("/(main)/(screens)/(request)/success");
  }, [duration, amount, abortController]);

  const handlePress = () =>
    router.canGoBack() ? router.back() : router.dismissTo("/(main)/(tabs)");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerWrapper}>
          <Pressable style={styles.backButton} onPress={handlePress}>
            <FontAwesome6 name="arrow-left" size={24} color="white" />
          </Pressable>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerText}>{t("title")}</Text>
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.main}>
          <View style={styles.contentHeader}>
            <Text style={styles.contentHeaderTitle}>{t("subTitle")}</Text>
            <Text style={styles.contentHeaderSubtitle}>{t("description")}</Text>
          </View>

          <View style={styles.boxSliders}>
            <BoxSlider
              min={requestConfig.minAmount}
              max={requestConfig.maxAmount}
              step={requestConfig.stepAmount}
              title={t("sliders.amount.title")}
              base={t("sliders.amount.base")}
              value={amount}
              onChange={handleAmountChange}
            />
            <BoxSlider
              min={requestConfig.minDuration}
              max={requestConfig.maxDuration}
              step={requestConfig.stepDuration}
              title={t("sliders.duration.title")}
              base={t("sliders.duration.base")}
              value={duration}
              onChange={handleDurationChange}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.divider}>
            <LinearGradient
              style={{ width: "95%", height: 2, opacity: 0.15 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={["transparent", "black", "transparent"]}
            />
          </View>

          <View style={styles.sendContainer}>
            <Text style={styles.footerText}>€</Text>
            <Animated.Text
              key={amount}
              style={[styles.footerText, { minWidth: 78 }]}
              entering={entering}
              exiting={exiting}
            >
              {amount}
            </Animated.Text>
            <Animated.Text style={styles.footerText}>{"-"}</Animated.Text>
            <Animated.Text
              key={duration}
              style={styles.footerText}
              entering={entering}
              exiting={exiting}
            >
              {duration}
            </Animated.Text>
          </View>
          <Pressable onPress={handleRequest}>
            <View style={styles.continueButton}>
              <Text style={styles.continueButtonText}>{gT("send")}</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    flex: 1,
    width: "100%",
    backgroundColor: "#F37021",
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  headerWrapper: {
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
    overflow: "hidden",
  },
  headerText: {
    width: "100%",
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 25,
    wordWrap: "wrap",
    overflow: "hidden",
    textOverflow: "elipsis",
    color: "white",
  },
  content: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "white",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  main: {
    paddingTop: 30,
  },
  contentHeader: {
    gap: 5,
  },
  contentHeaderTitle: {
    fontSize: 21,
    lineHeight: 28,
    textAlign: "center",
    fontFamily: "Poppins",
    fontWeight: "600",
  },
  contentHeaderSubtitle: {
    fontSize: 15,
    lineHeight: 18,
    fontFamily: "Poppins",
    fontWeight: "400",
    opacity: 0.7,
    textAlign: "center",
  },
  boxSliders: {
    flexDirection: "column",
    gap: 25,
    marginTop: 25,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  divider: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    fontFamily: "Poppins",
    fontWeight: "600",
    color: "black",
    fontSize: 20,
    lineHeight: 25,
    fontVariant: ["tabular-nums"],
  },
  continueButton: {
    backgroundColor: "#FF8135",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignContent: "center",
    borderRadius: 5,
  },
  continueButtonText: {
    color: "white",
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: 14,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    lineHeight: 20,
  },
  sendContainer: {
    flex: 1,
    flexDirection: "row",
    overflow: "hidden",
    gap: 5,
  },
  backButton: {
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
  },
});
