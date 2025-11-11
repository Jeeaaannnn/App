import LottieView from "lottie-react-native";
import checkAnimation from "@/assets/lottie/check.json";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useContext } from "react";
import { AuthContext } from "@/contexts/Auth";
import { UserContext } from "@/contexts/User";

// TODO
// Action from route parameters.
// Define text from route parameters.
// TODO i18n

export default function Success() {
  const { handleSetAuth } = useContext(AuthContext);
  const { storeUserData } = useContext(UserContext);
  const { data } = useLocalSearchParams<{ data: any }>();

  const onFinish = useCallback(() => {
    const resData = JSON.parse(data);
    storeUserData(resData.user);
    handleSetAuth({ token: resData?.token, date: new Date() });
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={checkAnimation}
        style={styles.lottie}
        resizeMode="cover"
        autoPlay
        loop={false}
        onAnimationFinish={onFinish}
      />
      <Text style={styles.textContainer}>
        La password è stata resettata con successo.
      </Text>
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
    width: "50%",
    height: "50%",
  },
  textContainer: {
    color: "white",
    fontFamily: "Poppins",
    fontWeight: "700",
    fontSize: 24,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
