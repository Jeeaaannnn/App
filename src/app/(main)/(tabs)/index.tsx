import { StyleSheet, View, Dimensions } from "react-native";
import { ProfileHeader } from "@/components/ProfileHeader";
import { HomeProvider } from "@/src/contexts/Home";
import Animated, {
  useSharedValue,
  interpolate,
  useAnimatedStyle,
  Extrapolation,
  useAnimatedScrollHandler,
  LinearTransition,
} from "react-native-reanimated";
import { ShareFriends } from "@/modules/Home/ShareFriends";
import CarouselAnimated from "react-native-reanimated-carousel";
import { useCallback, useContext, useMemo, useState } from "react";
import { HomeContext } from "@/src/contexts/Home";
import { CarouselRenderItemInfo } from "react-native-reanimated-carousel/lib/typescript/types";
import { Card, DocumentsCarousel, ProgressBar } from "@/modules/Home";
import { Case } from "@/interfaces/case.interface";

export default function HomeScreen() {
  return (
    <HomeProvider>
      <HomePageWrapper />
    </HomeProvider>
  );
}

function HomePageWrapper() {
  const { data, loading } = useContext(HomeContext);
  const [index, setIndex] = useState(0);
  const carouselIndex = useSharedValue(0);
  const carouselOffset = useSharedValue(0);
  const scrollY = useSharedValue(0);
  const [showHeader, setShowHeader] = useState(true);

  const selectedCard = useMemo(() => {
    if (!data || !data[index] || !data[index].data) return null;
    return data[index];
  }, [index, data]);

  const handleCarouselScroll = useCallback((offset: number, index: number) => {
    carouselIndex.value = index;
    carouselOffset.value = offset;
    setIndex(Math.floor(index));
  }, []);

  const carouselInputRange = !data
    ? [0, 0]
    : Array.from({ length: data.length + 1 }).map((_, needle) => {
        if (needle === data.length - 1) return needle - 1;
        if (needle >= data.length) return needle - 1;
        return needle;
      });

  const carouselOutputRange = !data
    ? [280, 280]
    : Array.from({ length: data.length + 1 }).map((_, needle) => {
        if (needle === data.length) return 145;
        return 280;
      });

  const carouselStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        carouselIndex.value,
        carouselInputRange,
        carouselOutputRange,
        Extrapolation.EXTEND
      ),
    };
  });

  const progressBarStyle = useAnimatedStyle(() => ({
    marginTop: 15,
    height: interpolate(carouselIndex.value, [0, 1, 2], [40, 0, 0]),
  }));

  const ItemRender = useCallback(
    ({ item }: CarouselRenderItemInfo<{ type: string; data: Case | null }>) => (
      <Card type={item.type} loading={loading} data={item.data} />
    ),
    []
  );

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const backgroundStyle = useAnimatedStyle(() => ({
    top: showHeader ? 260 : 170,
  }));

  return (
    <View style={[styles.container]}>
      <ProfileHeader />

      <Animated.ScrollView
        scrollEnabled={false}
        style={styles.scrollContainer}
        contentContainerStyle={[styles.scrollContent]}
        nestedScrollEnabled
        onScroll={scrollHandler}
      >
        <ShareFriends show={showHeader} />
        <CarouselAnimated
          loop={false}
          width={Dimensions.get("screen").width - 40}
          mode="parallax"
          windowSize={2}
          containerStyle={{ zIndex: 15 }}
          style={[{ overflow: "visible", zIndex: 15 }, carouselStyle]}
          modeConfig={{
            parallaxAdjacentItemScale: 1,
            parallaxScrollingScale: 1,
            parallaxScrollingOffset: -8,
          }}
          onProgressChange={handleCarouselScroll}
          data={data ?? [{ type: "", data: null }]}
          renderItem={ItemRender}
        />

        <ProgressBar
          selected={selectedCard}
          loading={loading}
          containerStyle={progressBarStyle}
        />

        <DocumentsCarousel selected={selectedCard} />
      </Animated.ScrollView>
      <Animated.View
        layout={LinearTransition}
        style={[styles.background, backgroundStyle]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#F37021",
  },
  background: {
    zIndex: 5,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "100%",
    backgroundColor: "white",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  scrollContainer: {
    width: "100%",
    zIndex: 10,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    paddingTop: 10,
  },
});
