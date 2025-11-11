import { StyleSheet, Text, View } from "react-native";
import InvitaAmico from "@/assets/svg/invita_amico.svg";
import Guadagna from "@/assets/svg/guadagna.svg";
import { CardElement, ContinueButton, Header } from "@/modules/ShareBoarding";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useTranslation } from "react-i18next";

export default function ShareFriendsBoarding() {
  const { t } = useTranslation("", { keyPrefix: "screens.shareOnboard" });
  const scrollShared = useSharedValue(0);

  const handleScroll = useAnimatedScrollHandler((e) => {
    scrollShared.value = e.contentOffset.y;
  });

  return (
    <>
      <Animated.View style={styles.container}>
        <Header scrollY={scrollShared} />
        <View style={styles.wrapper}>
          <Animated.ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContainerContent}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={0}
            onScroll={handleScroll}
          >
            <Text style={styles.scrollHeader}>{t("title")}</Text>

            <View style={styles.scrollIconContainer}>
              <InvitaAmico />
              <FontAwesome6 name="arrow-right-long" size={28} color="black" />
              <Guadagna />
            </View>

            <View style={{ flexDirection: "column", gap: 15, marginTop: 30 }}>
              <CardElement
                fill
                icon="clock"
                title="Inizio campagna"
                description="La campagna sarà disponibile dall'app a breve, per saperne
                    di più contatta il tuo consulente"
              />

              <CardElement
                icon="gift"
                title={t("cards.reward.title")}
                description={t("cards.reward.description")}
              />
              <View style={styles.divider} />

              <CardElement
                icon="user-plus"
                title={t("cards.shareToFriends.title")}
                description={t("cards.shareToFriends.description")}
              />

              <CardElement
                icon="link"
                title={t("cards.makeSubscribe.title")}
                description={t("cards.makeSubscribe.description")}
              />

              <CardElement
                icon="hand-holding-usd"
                title={t("cards.friendLiquid.title")}
                description={t("cards.friendLiquid.description")}
              />
            </View>
          </Animated.ScrollView>
        </View>
      </Animated.View>
      {/* <ContinueButton scrollY={scrollShared} /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    flex: 1,
    width: "100%",
    backgroundColor: "#F37021",
  },
  wrapper: {
    flex: 1,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: "white",
    overflow: "hidden",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "grey",
    opacity: 0.2,
  },
  scrollContainer: {
    flex: 1,
    width: "100%",
  },
  scrollContainerContent: {
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 25,
  },
  scrollHeader: {
    fontSize: 32,
    lineHeight: 40,
    fontFamily: "Poppins",
    fontWeight: "600",
    textAlign: "center",
  },
  scrollIconContainer: {
    marginTop: 50,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
});

// alwaysBounceHorizontal={false}
// alwaysBounceVertical={false}
// bouncesZoom={false}
// bounces={false}
// overScrollMode="never"
