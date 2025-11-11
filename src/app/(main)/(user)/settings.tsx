import { UserContext } from "@/contexts/User";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Href, Link, router } from "expo-router";
import { use } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

interface IItem {
  label: string;
  icon: string;
  href: Href;
}
function Item({ label, icon, href }: IItem) {
  return (
    <Link href={href}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
        <View
          style={{
            backgroundColor: "#F37021",
            borderRadius: 50,
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesome6 name={icon} size={20} color="white" />
        </View>
        <Text
          style={{
            fontFamily: "Poppins",
            fontWeight: "500",
            fontSize: 16,
            lineHeight: 24,
          }}
        >
          {label}
        </Text>
        <View style={{ marginLeft: "auto" }}>
          <FontAwesome6 name="angle-right" size={24} color="black" />
        </View>
      </View>
    </Link>
  );
}

export default function Settings() {
  const { userData } = use(UserContext);
  const circleText = `${userData?.firstName[0].toUpperCase()}${userData?.lastName[0].toUpperCase()}`;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerWrapper}>
          <Pressable style={styles.headerButton} onPress={() => router.back()}>
            <FontAwesome6 name="arrow-left" size={24} color="white" />
          </Pressable>
          <Text style={styles.headerText}>Modifica Profilo</Text>
        </View>
      </View>
      <View style={styles.main}>
        {/* <View style={styles.profileContainer}>
          <View style={styles.profileCircle}>
            <Text style={styles.profileCircleText}>{circleText}</Text>
          </View>
          <Text style={styles.profileName}>
            {userData?.firstName}
            {userData?.lastName}
          </Text>
        </View> */}
        <View style={styles.content}>
          <View style={{ marginTop: 30, gap: 35 }}>
            <Item
              label="Impostazioni notifiche"
              icon="bell"
              href="/(user)/notification-settings"
            />
            <Item
              label="Impostazioni password"
              icon="key"
              href="/(user)/password-settings"
            />
            <Item label="Termina account" icon="trash-can" />
          </View>

          {/* <FormProvider {...methods}>
            <Input name="username" label="Username" type="text" />
            <Input name="phone" type="phone" />
            <Input name="email" type="email" />
          </FormProvider>

          <Button containerStyle={{ marginTop: 25 }} label="Aggiorna Profilo" /> */}
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
    gap: 20,
  },
  header: {
    // minHeight: 80,
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
