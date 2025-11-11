import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { View, Text, Pressable, StyleSheet, Share } from "react-native";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t } = useTranslation("", { keyPrefix: "screens.sharePage" });

  const handleShare = useCallback(() => {
    Share.share({
      message: `Ciao, ho trovato un servizio rapido per ottenere un prestito grazie alla cessione del quinto. \n
👉     Ti lascio qui il link per richiedere una valutazione gratuita in pochi minuti: [INSERISCI LINK]`,
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.headerContainer}>
          {/* <Pressable onPress={handleGoBack} style={styles.goBackButton}>
            <FontAwesome6 name="arrow-left" size={24} color="white" />
          </Pressable> */}
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTextTop}>{t("subTitle")}</Text>
            <Text style={styles.headerTextBottom}>{t("title")}</Text>
          </View>
        </View>
        <View style={styles.shareContainer}>
          <View style={styles.shareCopyButton}>
            <Text style={styles.shareCopyText}>XILGH78</Text>
            <Text style={styles.shareCopyTextLabel}>{t("copyCode")}</Text>
          </View>
          <Pressable style={styles.shareButton} onPress={handleShare}>
            <FontAwesome6 name="share-nodes" size={24} color="black" />
          </Pressable>
        </View>
        <View style={styles.footerShareContainer}>
          <View style={styles.footerShareWrapper}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <FontAwesome6 name="share-nodes" size={18} color="black" />
            </View>
            <Pressable onPress={handleShare}>
              <Text>{t("shareLink")}</Text>
            </Pressable>
          </View>
          <View style={styles.termsContainer}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <FontAwesome6 name="file-lines" size={24} color="black" />
            </View>
            <Text>{t("termsAndConditions")}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 215,
    paddingHorizontal: 20,
  },
  wrapper: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  goBackButton: {
    position: "absolute",
    left: 0,
    top: 0,
    justifyContent: "center",
    height: "100%",
  },
  headerTextContainer: {
    marginHorizontal: "auto",
    alignItems: "center",
  },
  headerTextTop: {
    fontFamily: "Poppins",
    fontWeight: "400",
    color: "white",
    fontSize: 13,
    lineHeight: 18,
  },
  headerTextBottom: {
    fontFamily: "Poppins",
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 24,
    color: "white",
  },
  shareContainer: {
    marginTop: 25,
    width: "100%",
    flexDirection: "row",
    gap: 15,
    overflow: "hidden",
    alignItems: "center",
  },
  shareCopyButton: {
    flex: 1,
    backgroundColor: "white",
    borderStyle: "dotted",
    borderWidth: 3,
    borderRadius: 30,
    borderColor: "#FDD462",
    paddingVertical: 5,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    height: 65,
  },
  shareCopyText: {
    fontFamily: "Poppins",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 18,
  },
  shareCopyTextLabel: {
    fontSize: 12,
    marginLeft: "auto",
    opacity: 0.65,
    textTransform: "uppercase",
  },
  shareButton: {
    padding: 15,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
  },
  footerShareContainer: {
    width: "100%",
    marginTop: 15,
    flexDirection: "row",
    gap: 15,
  },
  footerShareWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "white",
    flexDirection: "row",
    gap: 10,
  },
  termsContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "white",
    flexDirection: "row",
    gap: 10,
  },
});
