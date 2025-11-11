import React, { useCallback, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import PagerView from "react-native-pager-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import PagingDots from "@/components/PagingDots";
import { OnboardingContext } from "@/contexts/Onboarding";
import { cardList } from "@/config/onboarding";
import { HeaderCarousel, Circle } from "@/src/modules/Onboarding";
import { usePagerScrollHandler } from "@/hooks/usePagerScrollHandler";
import { useTranslation } from "react-i18next";

// TODO: translation.

const { width } = Dimensions.get("window");

export default function OnBoarding() {
  const { t } = useTranslation();
  const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);
  const positionSharedValue = useSharedValue(0);
  const scrollOffsetSharedValue = useSharedValue(0);
  const insets = useSafeAreaInsets();
  const { handleSetOnboarded } = useContext(OnboardingContext);

  const handler = usePagerScrollHandler({
    onPageScroll: (e: any) => {
      "worklet";
      scrollOffsetSharedValue.value = e.offset;
      positionSharedValue.value = e.position;
    },
  });

  const scrollX = useDerivedValue(() => {
    const interpolatedValue = interpolate(
      positionSharedValue.value + scrollOffsetSharedValue.value,
      [0, cardList.length],
      [0, cardList.length * width],
      { extrapolateRight: Extrapolation.CLAMP }
    );

    return interpolatedValue;
  });

  const continueOpacity = useDerivedValue(() => {
    const interpolatedValue = interpolate(
      positionSharedValue.value + scrollOffsetSharedValue.value,
      [cardList.length - 2, cardList.length - 1],
      [0, 1],
      { extrapolateRight: Extrapolation.CLAMP }
    );

    return interpolatedValue;
  });

  const handlePress = useCallback(() => {
    if (positionSharedValue.value < cardList.length - 1) return;
    handleSetOnboarded();
  }, []);

  const continueStyle = useAnimatedStyle(() => ({
    opacity: continueOpacity.value,
  }));

  return (
    <>
      <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
        <HeaderCarousel
          position={positionSharedValue}
          offset={scrollOffsetSharedValue}
        />
        <View style={styles.wrapper}>
          <Circle
            position={positionSharedValue}
            offset={scrollOffsetSharedValue}
          />
          <AnimatedPagerView
            onPageScroll={handler}
            style={styles.pager}
            initialPage={0}
          >
            {cardList.map((el, index) => (
              <View collapsable={false} style={styles.page} key={index}></View>
            ))}
          </AnimatedPagerView>
          <View style={styles.bottomContainer}>
            <PagingDots
              data={cardList}
              style={{ position: "relative" }}
              dotStyle={styles.sliderIndicator}
              activeDotColor="#1E5689"
              activeDotScale={1.2}
              inActiveDotColor="#1E5689"
              scrollX={scrollX}
            />
            <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
              <Animated.View style={[styles.continueContainer, continueStyle]}>
                <Text style={styles.continueText}>
                  {t("screens.onboarding.continueBtn")}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f37021",
  },
  pager: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    overflow: "hidden",
  },
  sliderIndicator: {
    position: "relative",
    width: 13,
    height: 13,
    borderRadius: 50,
    marginHorizontal: 7.5,
  },
  bottomContainer: {
    position: "absolute",
    width: "100%",
    bottom: 50,
    flexDirection: "column",
  },
  continueContainer: {
    minWidth: "80%",
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: "#F37021",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    paddingVertical: 10,
  },
  continueText: {
    width: "100%",
    fontSize: 20,
    lineHeight: 24,
    fontFamily: "Poppins",
    fontWeight: "700",
    color: "white",
  },
});
