import { View, Text, StyleSheet, Pressable } from "react-native";
import PhoneSVG from "@/assets/svg/phone.svg";
import HeadPhoneSVG from "@/assets/svg/headphone.svg";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ExternLink, Card, InfoCard } from "@/modules/Help";
import helpersApi from "@/utils/api/helpers.api";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  interpolate,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import { scheduleOnRN } from "react-native-worklets";

// TODO: done take care of some things
// TODO: generate consultant types structure.

export default function Settings() {
  const { t } = useTranslation();
  const [data, setData] = useState<null | any>(null);
  const [details, setDetails] = useState<boolean>(false);
  const height = useSharedValue(165);
  const firstCardHeight = useSharedValue(165);
  const abortController = new AbortController();

  const loadData = useCallback(async () => {
    const result = await helpersApi.getMyConsultantInfo(abortController);
    setData(result.data);
  }, [abortController]);

  // TODO: improve
  const handleOpenDetail = useCallback(() => {
    scheduleOnRN(setDetails, !details);
    if (!details) {
      height.value = withTiming(345, {
        duration: 750,
        easing: Easing.bezier(0.32, 0.72, 0, 1),
      });
      firstCardHeight.value = withTiming(0, {
        duration: 750,
        easing: Easing.bezier(0.32, 0.72, 0, 1),
      });
    } else {
      setDetails(!details);
      height.value = withTiming(165, {
        duration: 750,
        easing: Easing.bezier(0.32, 0.72, 0, 1),
      });
      firstCardHeight.value = withTiming(165, {
        duration: 750,
        easing: Easing.bezier(0.32, 0.72, 0, 1),
      });
    }
  }, [details]);

  useEffect(() => {
    loadData();
  }, []);

  const FirstCardContent = useMemo(
    () =>
      data ? (
        <View style={styles.connectContent}>
          <InfoCard
            href={`https://wa.me/${data?.whatsapp ?? ""}`}
            icon="logo-whatsapp"
          />
          <InfoCard href={`mailto:${data?.email ?? ""}`} icon="mail-outline" />
          <InfoCard href={`tel:+39${data?.phone ?? ""}`} icon="call-outline" />
        </View>
      ) : (
        <></>
      ),
    [data]
  );

  const SecondCardContent = useMemo(
    () =>
      !details ? (
        <Animated.View style={styles.detailsContainer}>
          <Pressable onPress={handleOpenDetail}>
            <Text style={styles.detailsText}>Dettagli</Text>
          </Pressable>
        </Animated.View>
      ) : (
        <Animated.View style={styles.detailsContainer}>
          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "black",
              marginVertical: 10,
            }}
          />
          <View style={{ alignItems: "flex-end" }}>
            <Text style={{ fontFamily: "Poppins", fontWeight: "300" }}>
              Dal lunedi al venerdi
            </Text>
            <Text style={{ fontFamily: "Poppins", fontWeight: "300" }}>
              09:00 - 13:00
            </Text>
            <Text style={{ fontFamily: "Poppins", fontWeight: "300" }}>
              14:00 - 18:00
            </Text>
          </View>

          <Pressable onPress={handleOpenDetail}>
            <Text style={[styles.detailsText, { alignSelf: "flex-end" }]}>
              {t("general.words.close")}
            </Text>
          </Pressable>
        </Animated.View>
      ),
    [handleOpenDetail]
  );

  const firstCardStyle = useAnimatedStyle(() => ({
    height: firstCardHeight.value,
    opacity: interpolate(firstCardHeight.value, [0, 165], [0, 1]),
    marginBottom: interpolate(firstCardHeight.value, [0, 165], [0, 15]),
  }));
  const secondCardStyle = useAnimatedStyle(() => ({
    height: height.value,
  }));

  return (
    <View style={[styles.container]}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Parla con noi</Text>
      </View>
      <Animated.View style={styles.cardsContainer}>
        <Card
          icon={HeadPhoneSVG}
          title="Il tuo consulente"
          description="sempre al tuo fianco"
          style={firstCardStyle}
          content={FirstCardContent}
        />
        <Card
          expandable
          icon={PhoneSVG}
          title="La tua filiale"
          description="i contatti e i numeri utili con la tua filiale"
          expandData={{
            title: "I gestori sono disponibili",
            description: "da lunedi al venerdi",
            subDescription: "09:00 - 13-00 \n 14:00 - 18:00",
          }}
          style={secondCardStyle}
          content={SecondCardContent}
        />
      </Animated.View>
      <View style={styles.linksContainer}>
        <ExternLink
          label="Website"
          icon="globe-sharp"
          href="https://fin-solution.com"
        />
        <ExternLink
          label="Facebook"
          icon="logo-facebook"
          href="https://www.facebook.com/people/Fin-Solution-Italia-Spa/61574080286305/#"
        />
        <ExternLink
          label="Instagram"
          icon="logo-instagram"
          href="https://www.instagram.com/fin_solution"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#F37021",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 25,
    paddingHorizontal: 25,
    alignItems: "center",
  },
  headerText: {
    fontFamily: "Poppins",
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 24,
    color: "white",
    width: "100%",
    textAlign: "center",
  },
  cardsContainer: {
    flexDirection: "column",
    paddingHorizontal: 20,
  },
  linksContainer: {
    width: "100%",
    flex: 1,
    marginTop: 25,
    paddingHorizontal: 40,
    paddingVertical: 50,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: "white",
    gap: 20,
  },
  connectContent: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    flexDirection: "row",
    gap: 20,
  },
  detailsContainer: {
    marginTop: 5,
    flex: 1,
  },
  detailsText: {
    fontFamily: "Poppins",
    fontWeight: "700",
    lineHeight: 18,
    color: "black",
  },
});
