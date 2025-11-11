import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Href, router } from "expo-router";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { UserContext } from "@/contexts/User";
import { use, useCallback } from "react";
import { AuthContext } from "@/contexts/Auth";
import { useTranslation } from "react-i18next";
import { OneSignal } from "react-native-onesignal";

interface ISetting {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  href?: Href;
  onClick?: () => void;
}

function Item(props: ISetting) {
  const handlePress = useCallback(() => {
    if (!props.href && !props.onClick) return;
    if (props.href) router.navigate(props.href);
    if (props.onClick) props.onClick();
  }, [props.href, props.onClick]);

  return (
    <Pressable onPress={handlePress}>
      <View style={itemStyles.container}>
        <View style={itemStyles.icon}>
          <Ionicons name={props.icon} size={34} color="#F37021" />
        </View>
        <Text style={itemStyles.text}>{props.label}</Text>
      </View>
    </Pressable>
  );
}

const itemStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  icon: {
    padding: 10,
    borderColor: "#C63D27",
    borderWidth: 1,
    borderRadius: 15,
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 0,
        blurRadius: 10,
        spreadDistance: -7,
        color: "black",
      },
    ],
  },
  text: {
    fontFamily: "Poppins",
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 24,
  },
});

export default function UserHome() {
  const { t } = useTranslation();
  const { userData, removeUserData } = use(UserContext);
  const { removeAuth } = use(AuthContext);
  const circleText = `${userData?.firstName[0].toUpperCase()}${userData?.lastName[0].toUpperCase()}`;
  // const abortController = new AbortController();

  const handleLogOut = useCallback(async () => {
    OneSignal.logout();
    removeAuth();
    removeUserData();
  }, []);

  const onRequestDelete = async (): Promise<void> => {
    try {
      // Start loading
      // setDeleteLoading(true);

      // const deleteText = `Gentile Admin di Fin Solution App, l'utente ${user?.firstName} ${user?.lastName} con email ${user?.email} e ID: ${user?.id} ha richiesto tramite l'app mobile la cancellazione del proprio profilo. L'utente è stato informato che sarà ricontattato dal team di Fin Solution.`;

      // Send data to the BE
      // const res = await helpersApi.requestProfileEdit(
      //   abortController,
      //   deleteText,
      // );
      // Stop loading
      // setDeleteLoading(false);

      // Handle error
      // if (!res?.status) {
      //   const title = t('general.errors.alerts.serverError.title');
      //   const message = res?.message
      //     ? res.message
      //     : t('general.errors.alerts.serverError.message');
      //   Alert.alert(title, message);
      //   return;
      // }

      // Get data from response payload
      const title = t("screens.profile.alerts.deleteRequestSent.title");
      const message = t("screens.profile.alerts.deleteRequestSent.message");
      Alert.alert(
        title,
        message,
        [
          {
            text: t("general.words.ok") as string,
            // onPress: async () =>
            //   navigation.reset({
            //     index: 0,
            //     routes: [
            //       {
            //         name: 'Home',
            //       },
            //     ],
            //   }),
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("error", error);

      // Stop loading
      // setDeleteLoading(false);

      const title = t("general.errors.alerts.noNetwork.title");
      const message = t("general.errors.alerts.noNetwork.message");
      Alert.alert(title, message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerWrapper}>
          <Pressable style={styles.headerButton} onPress={() => router.back()}>
            <FontAwesome6 name="arrow-left" size={24} color="white" />
          </Pressable>
          <Text style={styles.headerText}>Profilo</Text>
        </View>
      </View>

      <View style={styles.main}>
        <View style={styles.profileContainer}>
          <View style={styles.profileCircle}>
            <Text style={styles.profileCircleText}>{circleText}</Text>
          </View>
          <Text style={styles.profileName}>
            {userData?.firstName} {userData?.lastName}
          </Text>
        </View>
        <View style={styles.content}>
          <Item
            // label="Dettagli profilo"
            label="Modifica profilo"
            icon="person-outline"
            href="/(user)/edit"
          />
          <Item
            label="Privacy"
            icon="shield-checkmark-outline"
            href="https://fin-solution.com/privacy"
          />
          {/* <Item
            label="Impostazioni"
            icon="settings-outline"
            href="/(user)/settings"
          /> */}
          <Item
            label="Cancellazione"
            icon="trash-bin-outline"
            onClick={() => {
              Alert.alert(
                "",
                "La richiesta di cancellazione è stata inoltrata."
              );
              handleLogOut();
            }}
          ></Item>
          <Item label="Esci" icon="exit-outline" onClick={handleLogOut} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: "#F37021",
    flex: 1,
    gap: 25,
  },
  header: {
    minHeight: 80,
  },
  headerWrapper: {
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  headerButton: {
    position: "absolute",
    left: 20,
    top: "50%",
    borderRadius: 50,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateY: "-50%" }],
  },
  headerText: {
    fontSize: 24,
    fontFamily: "Poppins",
    fontWeight: "600",
    lineHeight: 32,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    color: "white",
  },
  main: {
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: "white",
    flex: 1,
    // overflow: "hidden",
    padding: 20,
    paddingHorizontal: 40,
  },
  profileContainer: {
    top: -60,
    gap: 10,
  },
  profileCircle: {
    alignSelf: "center",
    width: 80,
    height: 80,
    backgroundColor: "white",
    borderRadius: 100,
    justifyContent: "center",
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 0,
        blurRadius: 10,
        spreadDistance: -7,
        color: "black",
      },
    ],
  },
  profileCircleText: {
    fontFamily: "Poppins",
    fontWeight: "700",
    color: "#F37021",
    textAlign: "center",
    justifyContent: "center",
    fontSize: 34,
    lineHeight: 42,
  },
  profileName: {
    fontFamily: "Poppins",
    fontWeight: "700",
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 18,
    lineHeight: 24,
    color: "#0E3E3E",
  },
  content: {
    gap: 25,
  },
});
