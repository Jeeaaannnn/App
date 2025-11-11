import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, Linking, StyleSheet } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

// TODO: set typescript for icons;

interface IProps {
  icon: "logo-whatsapp" | "mail-outline" | "call-outline";
  href: string;
}

export function InfoCard(props: IProps) {
  return (
    <Pressable onPress={() => Linking.openURL(props.href)}>
      <Animated.View style={styles.container}>
        <Ionicons name={props.icon} size={26} color="black" />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#DFF5F7",
    borderRadius: 10,
  },
});
