import { View, Text, StyleSheet, Pressable } from "react-native";
import Animated from "react-native-reanimated";
import { HomeContext } from "@/src/contexts/Home";
import { UserContext } from "@/src/contexts/User";
import { useContext, useMemo } from "react";
import ContentLoader, { Circle, Rect } from "react-content-loader/native";
import { router } from "expo-router";

export function ProfileHeader() {
  const { userData } = useContext(UserContext);
  const { data, loading } = useContext(HomeContext);

  const HeaderLoader = useMemo(
    () => (
      <ContentLoader
        backgroundColor="#d4a385"
        foregroundColor="#b9b6b6"
        speed={1}
        viewBox="0 0 275 50"
        height={50}
        width={275}
      >
        <Circle cx="25" cy="25" r="25" />
        <Rect x="68" y="10" rx="2" ry="2" width="75" height="15" />
        <Rect x="68" y="30" rx="2" ry="2" width="200" height="10" />
      </ContentLoader>
    ),
    []
  );

  if (loading || !data || !userData)
    return (
      <Animated.View style={[styles.container /*, animatedStyle*/]}>
        {HeaderLoader}
      </Animated.View>
    );

  return (
    <Animated.View style={[styles.container /*, animatedStyle*/]}>
      <View style={styles.wrapper}>
        <Pressable onPress={() => router.navigate("/(main)/(user)")}>
          <View style={styles.profileImageContainer}>
            {/* <Image /> eventually add images as well */}
            <Text style={styles.profileInitials}>
              {userData.firstName[0]}
              {userData.lastName[0]}
            </Text>
          </View>
        </Pressable>

        <View style={styles.profileMainContainer}>
          <Text style={styles.profileHello}>Ciao</Text>
          <Text style={styles.profileFullName}>
            {userData.firstName.toUpperCase()} {userData.lastName.toUpperCase()}
          </Text>
        </View>
        {/* <View style={styles.notifyContainer}>
        <MaterialCommunityIcons name="bell" size={32} color="white" />
        <View style={styles.notifyCounter}>
          <Text style={styles.notifyCountIndicator}>3</Text>
        </View>
      </View> */}
      </View>

      {/* <Profile /> */}
      {/* <ShareFriends /> */}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingHorizontal: 20,
  },
  //
  wrapper: {
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
  },
  profileImageContainer: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    borderRadius: 50,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  profileInitials: {
    fontFamily: "Poppins",
    fontWeight: "700",
    fontSize: 24,
    paddingTop: 5,
    color: "#F37021",
  },
  profileMainContainer: {
    marginLeft: 18,
    color: "white",
    verticalAlign: "middle",
  },
  profileHello: {
    color: "white",
    fontFamily: "Poppins",
    fontWeight: "400",
    lineHeight: 18,
  },
  profileFullName: {
    color: "white",
    fontFamily: "Poppins",
    fontWeight: "700",
    lineHeight: 18,
  },
  notifyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    width: 32,
    height: 32,
    alignSelf: "center",
  },
  notifyCounter: {
    top: 0,
    right: 0,
    backgroundColor: "#FF4267",
    borderRadius: "100%",
    position: "absolute",
    width: 16,
    height: 16,
    alignItems: "center",
  },
  notifyCountIndicator: {
    verticalAlign: "middle",
    fontSize: 10,
    color: "white",
  },
});
